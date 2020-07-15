---
title: REST
date: "2020-04-08T22:12:03.284Z"
description: ""
thumbnail: "./logo.png"
tags: ["BackEnd", "rest"]
---


<p align="center"><img src="./logo.png" style="width: 50vw; height: auto;"/></p>

> [그런 REST API로 괜찮은가](https://youtu.be/RP_f5dMoHFc?t=0s) 영상을 기반으로 한 문서입니다.



REST가 뭘까요? REST api가 뭐죠? 그게 REST api 인가요?

평상시 이런 질문을 받았을 때는 꽤나 난감했습니다.

하나의 end point가 하나의 메세지를 내 놓는것? API 명세서가 있어야 하는 것? self descriptive 해야하는 것?

항상 헷갈렸고 명쾌한 답을 내놓기는 힘들었기에 정리해 봤습니다.

<br>

## REST 란

---

<p align="center"><img src="./REST.jpeg" style="width: 50vw; height: auto;" /></p>

`REpresentational State Transfer 의 약자`

REST는 분산 하이퍼미디어 시스템(예: web)을 위한 아키텍쳐 스타일을 말합니다.

특이한 점은 아키텍쳐 스타일이면서 아키텍쳐 스타일의 집합이기도 합니다. 

> 아키텍쳐 스타일 : 제약 조건의 집합

REST의 특징은 자원(resource)의 표현(representation)에 의한 상태 전달이 이루어 지는 것입니다.

즉, 자원을 이름(표현)으로 구분하여 해당 자원의 상태(정보)를 주고 받는 모든 것들을 지칭하는 것이 REST입니다.

후에도 언급하겠지만 REST의 탄생 비화는 어떻게 하면 웹을 깨트리지 않고 HTTP를 향상시킬 수 있을까에 대한 고민에서 시작했습니다. 이 이야기는 후에 자세히 다루겠습니다.

<br>




## REST를 구성하는 스타일

---

REST가 되기 위한 조건이기도 합니다.

크게 6가지로 나뉘어 집니다.

<br>

- #### client - server

- #### stateless

- #### cache

- #### uniform interface

- #### layered system

- #### code-on-demand(*optional*)

<br>

조건이 꽤나 많습니다. 하지만 대부분은 크게 신경쓰지 않아도 됩니다.

그 이유는 HTTP만 따라도 client-server, stateless, cache, layered system은 잘 지켜 지기 때문입니다. 

*code on demand*는 서버에서 코드를 클라이언트로 보내서 실행할수 있어야 하는것을 말합니다. 즉, 우리의 브라우저에서 실행되는 Javascript를 가리키는 것입니다.

<br>

하지만 **uniform interface** 는 많은 경우 지켜지지 않고 지키기도 힘듭니다. 그렇다면 uniform interface가 뭘까요?

간단히 말하면 하나의 스타일이라고 생각하면 됩니다. 그 조건은 다음과 같습니다.

<br>

### Uniform Interface의 제약 조건

---

1. **Identification of resources**
2. **Manipulation of resources through representations**
3. **self-descriptive messages**
4. **HATEOAS(Hypermedia As The Engine Of Application State)**

<br>

해당 조건들에 대해 설명을 추가 해 보자면

*identification of resources* 

- 리소스가 uri로 식별되야 하는 것을 말합니다.
- 즉, 하나의 end-point가 하나의 리소스를 내 놓는 것을 말하는 것입니다.

*Manipulation of resources through representations* 

- 리소스를 만들거나 업데이트 하거나 삭제할때 HTTP 메세지에 표현을 담아서 전송하는 것을 말합니다.
- 쉽게 말해 의미에 맞는 HTTP  methods(GET, POST, PUT, DELETE ...)를 사용하는 것입니다.

*self-descriptive messages* 

- 메세지는 스스로 설명할 수 있어야 하는 것을 말합니다.

*hateoas* 

- 어플리케이션의 상태는 항상 hyperlink를 통해서 전이되어야 하는 것을 말합니다.

<br>

오늘날의 REST api들이 REST를 지키지 못하는 대부분의 이유는 *self-descriptive messages*와  *hateoas* 때문입니다.

사실 REST가 아닌데 REST라고 우기고 있는 것이죠.

그렇다면 왜 지켜지지 않는지에 대해 알아보도록 하겠습니다.

<br>

### Self-descriptive messages

---

Example 1

```http
GET / HTTP/1.1
```

- 이 요청 메세지는 목적지가 빠져있어서 self descriptive 하지 못합니다.
- 아래와 같이 목적지를 추가해 주어야 합니다.

```http
GET / HTTP/1.1
HOST : www.example.org
```

<br>

Example 2

```http
HTTP/1.1 200 OK
[{"op": "remove", "path": "/a/b/c" }]
```

-  이 응답 메세지의 문제는 어떤 문법으로 작성됐는지 설명이 없기 때문에 self descriptive 하지 못하게 되는 것입니다.
-  다음과 같은 방식으로 수정할 필요가 있습니다.

```http
HTTP/1.1 200 OK
Content-Type : application/json-patch+json
[ { "op": "remove", "path": "/a/b/c" } ]
```

오늘날 많은 경우 `Content-Type: application/json`으로만 표현합니다. 이렇게만 하더라도 메세지 파싱은 가능하기 때문입니다.

하지만 이 때 문제는 해당 객체의 op와 path가 도데체 뭔지 알 길이 없습니다. 따라서 *self-descriptive* 하지 않게 됩니다.

때문에 우리는 메세지의 뜻에 대해 명세를 할 필요가 있고 여기서는 `Content-Type : application/json-patch+json` 으로 표현했습니다. 의미는 **json-patch-json**이라는 미디어 타입으로 정의된 명세라는 뜻입니다.

따라서 해당 명세를 찾아가서 메세지의 뜻에 대해 파악할 수 있고 이를 통해 메세지를 *self-descriptive*하게 만들게 되는 것입니다.

<br>

### HATEOAS

---

`어플리케이션의 상태는 항상 hyperlink를 통해서 전이되어야 한다.`

쉽게 말해 특정 웹사이트의 상태가 변경되기 위해서는 항상 특정 링크를 따라서 변경되어야 하는 것을 말합니다.

대표적으로 HTML은 그 자체로 *hateoas*를 만족하게 되는데 a태그를 예로 해당 링크를 따라서 상태가 변화되기 때문입니다.

JSON으로 표현시 *hateoas*를 만족시키기 위해서는 Link 헤더 사용할 수 있습니다.

Link를 통해 해당 메세지(리소스)와 연결되어 있는 리소스에 대한 하이퍼링크를 제공하게 되는 것입니다.

```http
HTTP/1.1 200 OK
Content-Type: application/json
Link: 	</articles/1>; rel="previous",
	</articles/3>; rel="next"
{
	"title": "The second article",
	"contents": "blah blah..."
}
```



<br>

### Uniform interface의 필요성

---

그렇다면 이 복잡한 Uniform interface가 왜 필요할까요?

정답은 독립적 진화를 위해서 입니다. 

좀 더 상세히 이야기 하면 서버와 클라이언트의 독립적 진화를 위해서 입니다. 예로 서버의 기능이 변경되어도 클라이언트 업데이트가 필요 없는 것을 가능하게 하기 위해서 입니다.

글의 서두에서 언급한 REST를 고안하게 된 계기, **어떻게 하면 웹을 깨트리지 않고 HTTP를 발전시킬 수 있을까?** 의 핵심이 **Uniform interface**가 되는 것입니다.

<br>

### REST는 어떻게 웹 독립적 진화에 도움을 주었나

---

대표적으로 HTTP에 지속적으로 영향을 끼쳤습니다. 그 예는 다음과 같습니다.

1. HOST 헤더 추가
   - REST 아키텍쳐를 만들게 되며 HOST헤더의 필요성에 대해 제기되었습니다.
2. 길이 제한을 다루는 방법에 대한 명시
   - 414 URI Too Long 등이 있습니다.
3. URI에서 리소스 정의가 추상적으로 변경
   - 과거 URI는 문서의 위치를 의미했지만 REST로 인해 URI가 *식별하고자 하는 무언가* 의 의미로 변경이 되었습니다.

이 밖에도 HTTP와 URI에 많은 영향을 끼치게 되었고 그 결과 HTTP/1.1 명세 최신판에 REST에 대한 언급이 포함되게 되었습니다. 사실 이 이유는 HTTP, URI, REST 명세의 저자가 모두 Roy Feilding이기 때문이긴 합니다.

<br>

### Self-descriptive 와 HATEOAS가 독립적 진화에 어떻게 도움이 될까?

---

앞서 독립적 진화의 핵심이라고도 할 수 있는 uniform interface, 그 중에서도 self-descriptive와 hateoas가 어떻게 독립적 진화에 영향을 끼칠까요?

Self-descriptive 는 확장 가능한 커뮤니케이션을 야기하게 됩니다.

다른 말로 서버나 클라이언트에 변경이 있더라도 오고 가는 메시지는 언제나 self-descriptive하므로 언제나 해석 가능하므로 어떤 식으로 활용 될 수 있다는 것입니다.

HATEOAS는 어플리케이션 상태 전이가 late binding이 가능케 합니다.

쉽게 말해 어디서 어디로 전이가 가능한지 미리 결정되지 않는 것이고,  이것은 링크는 동적으로 변경될 수 있다는 말입니다.

예로 보면 서버가 링크를 바꿔도 클라이언트는 이것을 따라가기만 하면 되므로 동작에 전혀 영향이 없게 됩니다. 따라서 서버는 링크를 마음대로(클라이언트와 상의 없이) 바꿀 수 있게 되는 것입니다.

<br>

### 그렇다면 REST는 성공했을까요?

---

REST는 웹의 독립적인 진화를 위해 만들어졌고 웹은 독립적으로 진화하고 있습니다.

HTTP 버전이 계속 발전해도 우리가 쓰는 브라우저는 그대로여도 잘 작동하고 반대로 웹 브라우저의 업데이트에도 웹의 사용에 지장이 없는 것이 그 증거입니다.

따라서 REST는 성공적이라고 할 수 있습니다.

하지만 REST api의 경우 이야기가 다릅니다. RESTful API에 대해서는 [다음 문서](https://johnie-yeo.github.io/hello/back-end/2020/04/08/RESTful-API.html)에서 언급하도록 하겠습니다.

<br><br>


> #### Reference
>
> [그런 REST API로 괜찮은가](https://youtu.be/RP_f5dMoHFc?t=0s)
>
> [[Network]REST란?](https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html)
>
> [Understanding REST](https://medium.com/@sagar.mane006/understanding-rest-representational-state-transfer-85256b9424aa)
>
> [Testing APIs using advanced REST client ](https://itnext.io/testing-apis-using-advanced-rest-client-29edc785bfb1)


