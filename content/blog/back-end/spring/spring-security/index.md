---
title: Spring Security Filter
date: "2022-04-03T22:16:21.000Z"
description: "spring security filter"
thumbnail: "./logo.jpeg"
tags: ["spring security", "spring security filter"]
---


<p align="center"><img src="./logo.jpeg" style="width:50vw; height:auto;"/></p>

# Spring Security Filter

일반적인 웹 환경에서 브라우저가 서버에게 요청을 보내게 되면, DispatcherServlet이 요청을 받기 이전에 많은 ServletFilter를 거치게 됩니다. 
Spring Security도 서블릿 필터로써 작동하여 인증, 권한과 관련한 처리를 진행하게 됩니다

<br>

<br><br>

## SecurityContextPersistenceFilter

SecurityContextRepository를 통해 SecurityContext를 Load/Save 처리합니다.

요청이 들어오기 전에, SecurityContextRepository에서 받아온 정보를 SecurityContextHolder에 주입합니다.

## LogoutFilter

로그아웃 URL(기본값: /logout)로의 요청을 감시하여 해당 사용자(principal)를 로그아웃 시킵니다.

하지만 기본 로그아웃 페이지는 LogoutFilter가 생성하는것이 아닌 DefaultLogoutPageGeneratingFilter 가 생성합니다.

### LogoutFilter의 두가지 구성 요소

#### 1.Logout handler

다른 여러 로그아웃 핸들러를 감싸는 객체

사실상 다른 여러개의 로그아웃 핸들러를 사용

기본적으로 2개의 로그아웃 핸들러가 사용

- CsrfLogoutHandler
- SecurityContextLogoutHandler


#### 2.Logout Success Handler

로그아웃 처리를 하고난 뒤 어떻게 처리를 할것인지 를 결정하는 핸들러

기본 핸들러는 SimpleUrlSuccessHandler 

기본으로 명시되어있는 URL로 리다이렉트


## UsernamePasswordAuthenticationFilter

로그인 인증 과정을 진행하는 필터

ID/비밀번호 기반 Form 인증 요청 URL(기본값: /login)을 감시하여 사용자를 인증합니다.
 
사용자 인증 요청을 Authentication 인터페이스로 추상화하고, AuthenticationManager를 호출

> Authentication 인터페이스에서 제공하는 핵심 메소드
> 
> Object getPrincipal() 
> - 인증 아이디
> 
> Object getCredentials() 
> - 인증 비밀번호
> 
> Collection<? extends GrantedAuthority> getAuthorities() 
> - 인증된 사용자의 권한 목록
> 
> Object getDetails() 
> - 인증된 사용자의 부가정보

## DefaultLoginPageGeneratingFilter

사용자가 별도의 로그인 페이지를 구현하지 않은 경우, 스프링에서 기본적으로 설정한 로그인 페이지를 처리합니다.

시큐리티 설정파일에서 직접 로그인페이지로 갈 url 을 맵핑시켜주면 FilterChainProxy에서 빠지게 됩니다.

```java
http.formLogin()
    .loginPage("/login")
```

## BasicAuthenticationFilter

HTTP 요청의 (BASIC)인증 헤더를 처리하여 결과를 SecurityContextHolder에 저장합니다.

> Basic 인증이란
> 
> 요청 헤더에 username 과 password를 (username:password) 를 Base64 로 인코딩한 값을 실어서 보내는 것
> 
> 이 필터를 이용하면, 이전에 폼요청으로 받아온 데이터로 UsernamePasswordAuthenticaton 토큰을 생성하지 않아도, 요청 헤더의 정보를 사용하여 UsernamePasswordAuthenticaton 토큰을 생성할 수 있다.
> 
> 토큰이 생성된 이후의 과정은 UsernamePasswordAuthenticationFilter 의 과정과 동일하다.

## RememberMeAuthenticationFilter

SecurityContext에 인증(Authentication) 객체가 있는지 확인하고, RememberMeServices를 구현한 객체의 요청이 있을 경우, Remember-Me(ex. 사용자가 바로 로그인을 하기 위해서 저장 한 아이디와 패스워드)를 인증 토큰으로 컨텍스트에 주입합니다.

## SecurityContextHolderAwareRequestFilter

시큐리티 관련 서블릿 API 를 지원해주는 필터

-> 개발자가 직접 건드릴 일이 거의 업다.
-> "ROLE_" prefix 붙이는 역할 등

## AnonymousAuthenticationFilter

SecurityContextHolder에 인증(Authentication) 객체가 있는지 확인하고, 필요한 경우 Authentication 객체를 주입합니다.

만약 SecurityContext 에 Authentication 이 있다면 넘어가게 됩니다.

## SessionManagementFilter

요청이 시작된 이후 인증된 사용자 인지 확인하고, 인증된 사용자일 경우SessionAuthenticationStrategy를 호출하여 세션 고정 보호 메커니즘을 활성화하거나 여러 동시 로그인을 확인하는 것과 같은 세션 관련 활동을 수행합니다.

주요 역할
- 세션 변조 방지 전략을 설정
- 유효하지 않은 세션을 Redirect 시킬 URL을 설정
- 동시성 제어 설정
- 세션생성전략 설정

## ExceptionTranslationFilter

요청을 처리하는 중에 발생할 수 있는 예외를 위임하거나 전달
필터 체인 내에서 발생(Throw)되는 모든 예외(AccessDeniedException, AuthenticationException)를 처리합니다.

FilterSecurityInterceptor 와 연계가 강하게 되는 필터로, FilterSecurityInterceptor 가 AccessDecisionManager 를 통해 AuthenticationException 혹은 AccessDeniedException 을 발생시킨 경우 해당 Exception을 받아 AuthenticationException의 경우 AuthenticationEntryPoint 로 보내주고, AccessDeniedException 의 경우에는 AccessDeniedHandler 로 보내는 역할을 담당합니다.

## FilterSecurityInterceptor

접근 권한 확인을 위해 요청을 AccessDecisionManager로 위임
이 필터가 실행되는 시점에는 사용자가 인증됐다고 판단

HTTP 리소스의 보안 처리를 수행합니다.

<br>
<br>
<br>

> ### Reference
> - [Spring Security (2) - 주요 구조](https://velog.io/@sa833591/Spring-Security-2)
> - [Spring Security (5) - Spring Security Filter 적용](https://velog.io/@sa833591/Spring-Security-5-Spring-Security-Filter-%EC%A0%81%EC%9A%A9)
> - [Spring Security - Filter, FilterChain](https://siyoon210.tistory.com/32)
> - [Spring Security의 다양한 Filter -Part 3](https://velog.io/@jaden_94/Spring-Security%EC%9D%98-%EB%8B%A4%EC%96%91%ED%95%9C-Filter-Part-3)
> - [[스프링 시큐리티] 자원 접근 허용 여부 검증(Authorization, FilterSecurityInterceptor)](https://uchupura.tistory.com/35)
> - [Class SecurityContextHolderAwareRequestFilter](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/web/servletapi/SecurityContextHolderAwareRequestFilter.html)
> - [Spring Security - Logout Filter](https://ncucu.me/121)