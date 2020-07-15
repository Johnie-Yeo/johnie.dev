---
title: CORS
date: "2020-06-12T15:12:03.284Z"
description: ""
thumbnail: "./CORS_principle.png"
tags: ["Network"]
---

> [MDN : Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) 번역



Cross-Origin Resource Sharing (CORS)는 추가적인 HTTP 헤더를 사용함으로써 브라우저에게 한 [origin](https://developer.mozilla.org/en-US/docs/Glossary/origin) 실행중인 웹 어플리케이션이 다른 origin에서 온 자원에 접근할 수 있다는 것을 알리기 위한 메커니즘 입니다. 웹 어플리케이션은 자신과 다른 origin(도메인, 프로토콜, 포트번호 등)에 자원을 요청할 때 cross-origin HTTP 요청을 실행합니다. 즉 origin이 다르다는 것은 프로토콜, 도메인 포트번호 중 하나라도 다르면 다른 origin이게 되는 것입니다.

다음은 cross-origin 요청의 예시입니다.

`https://domain-a.com`을 통해 서빙된 FrontEnd의 Javascript 코드가 `XMLHttpRequest`(이하 XHR) 를 사용하여 `https://domain-a.com` **에서** 요청을 보내는 것.



보안상의 이유로 브라우저는 스크립트에서의 cross-origin HTTP 요청을 제한합니다. 그 예로 `XHR` 과 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 는 [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) 를 따릅니다. 이것은 웹 어플리케이션이 저 API를 통해 same origin 어플리케이션에만 리소스 요청이 가능하다는 것을 말합니다. 하지만 올바른 CORS 헤더를 포함한 응답의 경우는 다른 origin의 리소스도 가져올 수 있게 됩니다.

<br>

![](./CORS_principle.png){:width="50%"}

<br>

CORS 메커니즘은 안전한 브라우저와 서버 간의 안전한 cross-origin 요청과 데이터 전송을 지원합니다. 현대의 브라우저는 XHR, Fetch와 같은 API에서 CORS를 사용함으로써 cross-origin HTTP 요청을 완화시킵니다.

<br>

---

<br>

## What requests use CORS?

cross-origin sharing 표준은 cross-site HTTP 요청을 가능하게 함으로써 다음 기능을 수행할 수 있게 합니다.

- XHR 혹은 Fetch APIs의 호출
- 웹 폰트(CSS에서 `@font-face` 를 통한 크로스 도메인 폰트 사용)
  - 따라서 서버는 cross-site에서 로드될 수 밖에 없는 TrueType font를 배포하고 허가된 웹 사이트에서 사용할 수 있게 합니다.
- WebGL textures
- [`drawImage()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage) 을 사용하여 캔버스에 그려진 이미지/비디오 프레임
- [이미지기반의 CSS Shapes](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Shapes/Shapes_From_Images)

이 글은 Cross-Origin Resource Sharing의 일반적인 내용과 필수 HTTP 헤더를 포함한 내용이 다뤄집니다.

> True Type Font란?
>
> - 1980년대 애플과 MS가 어도비에 대항하기 위해 만든 글꼴 저장 형식

<br>

---

<br>

## Functional overview

Cross-Origin Resource Sharing 표준은 새로운 HTTP 헤더를 추가함으로써 서버가 어떤 origin이 웹 브라우저에서 정보를 읽을수 있는지 표현할 수 있게 합니다. 게다가 서버 데이터에 사이드 이펙트를 유발할 수 있는 HTTP 요청 메서드(특히 MIME type을 사용하는 GET과 POST 이외의 HTTP 메서드)의 경우 명세서에 브라우저가 `preflight` 요청을 보내도록 강제하도록 되어 있습니다. HTTP OPTIONS 요청 메서드를 사용하여 서버에서 지원되는 방법을 요청하고 서버가 "approve" 하면 실제 요청을 보내게 됩니다. 서버는 또한 클라이언트에게 "credential"(쿠키 혹은 HTTP 인증)이 요청에 필요한 지에 대해서도 알릴 수 있습니다. 

CORS 실패로 인해 에러가 발생할 수 있지만, 보안상의 이유로 Javascript에서 에러에 대해 상세 내용을 볼 수 없습니다. 문제에 대해 세부적으로 알 수 있는 유일한 방법은 브라우저의 콘솔에서 보는 수 밖에 없습니다. 

계속해서 다음 섹션에서 사용된 HTTP 헤더에 대해 설명하겠습니다.

<br>

---

<br>

## Examples of access control scenarios

다음은 어떻게 Crosss-Origin Resource Sharing이 작동하는 지에 대한 세가지 시나이오입니다. 모든 예는 어떤 브라우저에서도 작동하는 cross-site 요청을 만들 수 있는 XHR을 사용합니다.

서버 측의 관점(PHP 코드 스니펫 포함)에서의 Cross-Origin Resource Sharing에 대한 설명은  [Server-Side Access Control (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Server-Side_Access_Control) 글을 참조하세요.

<br>

### Simple requests

몇몇 요청은 CORS preflight이 트리거 되지 않습니다. 여기서는 이러한 것을 `simple requests`라고 합니다. 하지만 CORS를 정의한 [Fetch](https://fetch.spec.whatwg.org/) 스펙에서는 이런 용어를 사용하지는 않습니다. *simple request*는 다음 조건을 모두 충족시키는 경우를 말합니다.

- HTTP 메서드는 다음 중 하나여야 합니다.
  - [`GET`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET)
  - [`HEAD`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD)
  - [`POST`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)
- user agent에 의해 자동으로 설정된 헤더(예 : `Connection`,`User-Agent`, 혹은 Fetch 스펙에서 금지된 헤더 이름으로 정의된 다른 헤더) 외에 수동으로 설정할 수 있는 헤더는 Fetch 스펙에 "CORS-safelisted request-header"로 정의되며 예는 다음과 같습니다.
  - [`Accept`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept)
  - [`Accept-Language`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language)
  - [`Content-Language`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Language)
  - [`Content-Type`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) (Content Type에 대해서는 아래에 추가 요구사항이 있습니다.)
  - `DPR`
  - `Downlink`
  - `Save-Data`
  - `Viewport-Width`
  - `Width`
- Content-Type 헤더에 허용되는 값은 다음으로 제한됩니다.
  - `application/x-www-form-urlencoded`
  - `multipart/form-data`
  - `text/plain`
- 요청에 사용된 어떤 XMLHttpRequestUpload 객체에도 이벤트 리스너는 등록되어 있지 않아야 합니다. 이벤트 리스너는 모두 `XMLHttpRequest.upload` 속성을 사용해서 엑세스 해야 합니다.
- 어떤 [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) object도 요청에서 사용되지 않아야 합니다.

> **Note**: 이것은 웹 컨텐츠가 발행해온 것과 같은 종류의 cross-site 요청이고 서버가 적절한 헤더를 보내지 않으면 요청한 주체에게 응답 데이터가 공개되지 않습니다. 따라서 cross-site 요청 위조를 방지하는 사이트는 HTTP 접근 제어에서 신경 쓸 것이 없습니다.

> **Note**: WebKit Nightly 및 Safari Technology Preview는 Accept, Accept-Language, Content-Language 헤더에서 허용되는 값에 대한 추가 제한이 있습니다. 만약 이 헤더 중 하나라도 "nonstandard" 값이 있으면 WebKit/Safari는 이 요청을 simple request로 취급하지 않습니다. 다음 WebKit버그를 제외하고 WebKit/Safari가 "nonstandard"라 판단한 값은 문서화되어 있지 않습니다.
>
> - non-standard CORS-safelisted 요청 헤더 Accept, Accept-Language, Content-Language에서 preflight을 요청하는 것
> - simple CORS에서 Accept, Accept-Language, Content-Language 요청 헤더에서 쉼표를 허용하는 것 
> - simple CORS 요청에서 제한된 Accept 헤더에 대한 블랙리스트 모델로 전환
>
> 다른 브라우저에서는 이런 사항들은 spec에 없기 때문에 이런 추가적인 제한사항이 구현되어 있지 않습니다. 

예를 들어 웹 컨텐츠가 `https://foo.example` 에서 도메인 `https://bar.other` 의 컨텐츠를 호출하려 한다고 가정해 보겠습니다. 다음과 같은 Javascript 코드가 `foo.example` 에 포함되어 있을 것입니다.

```javascript
const xhr = new XMLHttpRequest();
const url = 'https://bar.other/resources/public-data/';
   
xhr.open('GET', url);
xhr.onreadystatechange = someHandler;
xhr.send();
```

이런 경우 CORS 헤더를 사용하여 권한을 다루며 클라이언트와 서버 간 간단한 교환작업이 수행됩니다.

![](./simple-req-updated.png){:width="50%"}

이 경우 브라우저가 서버에게 어떤 것을 보내는지, 서버는 어떤 응답을 내 놓는지 살펴보겠습니다.

```http
GET /resources/public-data/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: https://foo.example
```

요청헤더에서 주목할 만한 것은 `Origin` 으로 호출이 `https://foo.example` 에서 왔다는 것을 보여줍니다.

```http
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 00:23:53 GMT
Server: Apache/2
Access-Control-Allow-Origin: *
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Transfer-Encoding: chunked
Content-Type: application/xml

[…XML Data…]
```

응답에서는 서버가  [`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin)  헤더를 보내게 됩니다.  `Origin` 헤더와 `Access-Control-Allow-Origin` 헤더의 사용은 접근 제어 프로토콜의 가장 쉬운 사용 예입니다. 이 경우 서버는 `Access-Control-Allow-Origin: *`  와 함께 응답함으로써 어떤 도메인에서도 이 리소스를 사용할 수 있다는 것을 의미합니다. 만약 리소스의 주인이 `https://bar.other` 에서  `https://foo.example` 에서의 요청에만 리소스를 제공하도록 제한하고 싶다면 다음과 같이 설정 할 수 있습니다.

```http
Access-Control-Allow-Origin: https://foo.example
```

이제 `foo.example` 이 아닌 다른 도메인에서는 cross-site manner에 의해 리소스에 접근 할 수 없게 됩니다. 이것을 허용하기 위해서는 요청을 보낸 Origin 헤더의 값이 `Access-Control-Allow-Origin` 헤더에 포함되어야 합니다.

<br>

### Preflighted requests

위에서 언급한 "simple request" 와 달리 "preflighted" 요청은 실제 요청을 보내기 안전한지 검사하기 위해 본 요청에 앞서 HTTP OPTIONS 메서드를 다른 도메인의 리소스에 보내게 됩니다. Cross-site 요청은 유저 데이터에 영향을 끼칠 수도 있기 때문에 이렇게 preflight 됩니다. 

다음의 예는 요청이 preflighted 되는 예시입니다.

```javascript
const xhr = new XMLHttpRequest();
xhr.open('POST', 'https://bar.other/resources/post-here/');
xhr.setRequestHeader('X-PINGOTHER', 'pingpong');
xhr.setRequestHeader('Content-Type', 'application/xml');
xhr.onreadystatechange = handler;
xhr.send('<person><name>Arun</name></person>'); 
```

위의 예는 XML body를 만들어 `POST` 요청과 함께 보냅니다. 또한 non-standard HTTP `X-PINGOTHER` 이 요청 헤더에 설정되어 있습니다. 이러한 헤더는 HTTP/1.1에 포함된 헤더가 아니지만 일반적으로 웹 어플리케이션에 유용하게 쓰입니다. 요청의 Content-Type이 `text/xml` 형식을 따르고 커스텀 헤더가 사용되었으므로 이 요청은 preflight 되게 됩니다.

![](./preflight_correct.png){:width="50%"}

> **Note**: 아래에 설명된 것처럼 실제 `POST` 요청은 `Access-Control-Request-*` 헤더를 포함하지 않습니다. 오직 `OPTIONS` 요청에서만 필요한 것입니다.

여기서 클라이언트와 서버간에 실제로 교환된 내용이 어떤 것인지 살펴보겠습니다 첫번째 교환은 preflight에 대한 요청과 응답입니다.

&lt; Preflight 요청 &gt;

```http
OPTIONS /doc HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: http://foo.example
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER, Content-Type
```

&lt; Preflight 응답 &gt;

```http
HTTP/1.1 204 No Content
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
Vary: Accept-Encoding, Origin
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
```

preflight 요청이 완료되면 다음의 실제 요청이 보내 집니다.
&lt; 실제 요청 &gt;

```http
POST /doc HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
X-PINGOTHER: pingpong
Content-Type: text/xml; charset=UTF-8
Referer: https://foo.example/examples/preflightInvocation.html
Content-Length: 55
Origin: https://foo.example
Pragma: no-cache
Cache-Control: no-cache

<person><name>Arun</name></person>
```

&lt; 실제 응답 &gt;

```http
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:40 GMT
Server: Apache/2
Access-Control-Allow-Origin: https://foo.example
Vary: Accept-Encoding, Origin
Content-Encoding: gzip
Content-Length: 235
Keep-Alive: timeout=2, max=99
Connection: Keep-Alive
Content-Type: text/plain

[Some XML payload]
```

처음의 요청 1 - 10라인은 `OPTIONS` 메서드와 함께 preflight 요청이 발생한 것을 보여줍니다. 브라우저는 위의 Javascript 코드 스니펫이 사용중인 요청 매개변수를 기반으로 요청을 보냅니다. 그러면 서버는 실제 요청 파라미터를 보고 요청이 수용할 수 있는지 응답합니다. OPTIONS는 HTTP/1.1에서의 메서드로 서버에서 추가 정보를 결정하고, [safe](https://developer.mozilla.org/en-US/docs/Glossary/safe) 메서드로 리소스를 변경하기 위해 사용되지 않습니다. OPTIONS 메서드는 다음과 같이 두개의 다른 요청 헤더가 전송됩니다.(첫번째 요청에서의 9, 10 라인 참조)

```http
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER, Content-Type
```

[`Access-Control-Request-Method`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Request-Method) 헤더는 preflight 요청의 일부로 실제 요청이 전송 될 때 `POST` 요청이 전송 될 것이라는 것을 알립니다. [`Access-Control-Request-Headers`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Request-Headers) 는 실제 요청이 전송 될 때 `X-PINGOTHER` 과 `Content-Type` 이라는 커스텀 헤더가 사용된다는 것을 알립니다. 서버는 이제 이 모든 상황을 고려하여 요청을 수용할 것인지 결정하게 됩니다.

preflight 요청에 대한 응답메세지는 요청 메서드(POST)와 요청 헤더(X-PINGOTHER)을 모두 수용한다는 내용을 나타냅니다. 여기서 4 - 7 라인을 살펴보겠습니다.

```http
Access-Control-Allow-Origin: http://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
```

서버는  `Access-Control-Allow-Methods` 에서 POST, GET가 가용한 메서드라고 응답합니다. 주의할 점은 이 헤더는 응답 헤더 [`Allow`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Allow) 와도 유사하지만 접근 제어의 컨텍스트에서 엄격하게 사용됩니다. 

서버는  `Access-Control-Allow-Headers` 의 값으로 `X-PINGOTHER`, `Content-Type` 을 사용함으로써 이러한 헤더가 실제 요청에서 사용될 수 있다는 것을 확인시켜 주게 됩니다.  `Access-Control-Allow-Methods` 에서 처럼 `Access-Control-Allow-Headers` 에서도 가용 헤더의 리스트가 `,` 로 구분됩니다.

최종적으로 [`Access-Control-Max-Age`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age) 가 preflight 요청에 대한 응답이 얼마나 오랫동안(단위 : 초) 캐싱되어 새로운 preflight 요청 없이 수행가능하게 하는지 나타냅니다. 이 예에서는 86400 초로 24시간을 나타냅니다. 기억할 점은 각각의 브라우저는  [maximum internal value](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age) 를 가지며 `Access-Control-Max-Age` 가 더 크다면 값을 선점하게 됩니다.

<br>

#### Preflighted requests and redirects

모든 브라우저가 preflight 요청 이후에 다음과 같은 redirect를 지원하지는 않습니다. preflight 요청 이후 redirect가 발생했다면, 몇몇 브라우저는 다음과 같은 방식으로 에러 메세지를 표시하게 됩니다.

**The request was redirected to 'https://example.com/foo', which is disallowed for cross-origin requests that require preflight**

**Request requires preflight, which is disallowed to follow cross-origin redirect**

CORS 프로토콜이 원래는 이렇게 동작하도록 요구되었었으나 더이상은 필요하지 않도록 변경되었습니다.[ref](https://github.com/whatwg/fetch/commit/0d9a4db8bc02251cc9e391543bb3c1322fb882f2) 하지만 모든 브라우저가 이러한 변화를 수용한 것이 아니기 때문에 원래 필요했던 동작이 여전히 나타나고 있습니다.

브라우저가 이러한 요구사항을 만족시키기 전까지는 다음 중 최소 한가지를 수행 함으로써 제약사항을 해결 할 수 있습니다.

- 서버에서 preflight을 피하거나 redirect를 하지 않는 방법
- 요청을 simple request로 변경하여 preflight을 일어나지 않게 하는 방법

이러한 방법이 가능하지 않다면 다음과 같은 다른 방법도 있습니다.

1. Simple request 만들어 실제 preflight 요청을 받는 URL 사용(Fetch API에서 [`Response.url`](https://developer.mozilla.org/en-US/docs/Web/API/Response/url) 사용 혹은  [`XMLHttpRequest.responseURL`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseURL) 사용)
2. 첫번째 동작에서 얻은 결과 `Response.url` 혹은 `XMLHttpRequest.responseURL` 의 값을 URL으로 사용하는 다른 요청 만들기(본 요청)

하지만 요청이 `Authorization` 헤더를 가져 preflight을 트리거 하는 요청이라면 이러한 방법으로 제약을 해결할 수는 없습니다. 또 요청 서버를 직접 제어할수 있는 것이 아닌 경우도 해결이 불가능합니다.

<br>

### Requests with credentials

XHR / Fetch 과 CORS에서 부각되는 가장 흥미로운 기능은 HTTP 쿠키 와 HTTP 인증 정보를  인식하는 "credentialed" 요청을 만들 수 있는 것입니다. 기본적으로 cross-site간의 XHR 혹은 Fetch 호출에서는 브라우저는 credential을 보내지 않습니다. 호출 시 특정 플래그가 XHR 객체 혹은 Request 생성자에 설정이 되었을 때만 가능합니다.

이 예에서는 `http://foo.example` 에서 처음 로드 된 컨텐츠가 쿠키를 설정하는 `http://bar.other` 에 간단한 GET 요청을 보냅니다. foo.example의 컨텐츠는 다음과 같은 Javascript 코드가 삽입되어 있습니다.

```javascript
const invocation = new XMLHttpRequest();
const url = 'http://bar.other/resources/credentialed-content/';
    
function callOtherDomain() {
  if (invocation) {
    invocation.open('GET', url, true);
    invocation.withCredentials = true;
    invocation.onreadystatechange = handler;
    invocation.send(); 
  }
}
```

7번째 줄을 보면 쿠키 호출을  생성하기 위해 설정된 XHR의 플래그, `withCredentials` 라는 boolean 값이 사용 되었습니다. 디폴트로는 호출은 쿠키 없이 만들어 집니다. 여기서는 preflight 되지 않는 simple `GET`메서드이지만, 브라우저는 [`Access-Control-Allow-Credentials`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials)`: true` 헤더를 포함되지 않은 응답은 모두 reject 하고 호출한 웹컨텐츠에 어떠한 가용 응답도 제공하지 않습니다.

![](./cred-req-updated.png){:width="50%"}

다음은 클라이언트와 서버의 간단한 교환 내용 입니다.

&lt; Request &gt;

```http
GET /resources/credentialed-content/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Referer: http://foo.example/examples/credential.html
Origin: http://foo.example
Cookie: pageAccess=2
```

&lt; Response &gt;

```http
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:34:52 GMT
Server: Apache/2
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Credentials: true
Cache-Control: no-cache
Pragma: no-cache
Set-Cookie: pageAccess=3; expires=Wed, 31-Dec-2008 01:34:53 GMT
Vary: Accept-Encoding, Origin
Content-Encoding: gzip
Content-Length: 106
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain


[text/plain payload]
```

요청의 10라인에서 쿠키가  `http://bar.other` 로 간다는 것을 나타내지만 만약 bar.other이 [`Access-Control-Allow-Credentials`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials)`: true` 를 포함하지 않은 응답 보냈다면 해당 응답은 무시되고 웹 컨텐츠에서 비가용적이게 될 것입니다.

<br>

#### Credentialed requests and wildcards

credential 요청에 대해 응답 할 때는 서버는  **반드시** `Access-Control-Allow-Origin` 헤더를 통해 origin을 특정화할 필요가 있습니다. 즉 "*" 와 같은 wildcard를 사용하면 안됩니다.

이유는 위의 요청 헤더를 보면 `Cookie` 헤더를 포함하고 있는데, 이 경우 `Access-Control-Allow-Origin` 의 값이 "*" 라면 요청은 실패하게 되기 때문입니다. 하지만 여기서는 `Access-Control-Allow-Origin` 헤더의 값이 `http://foo.example`으로 실제 origin 이기 때문에 credential로 인식된 요청이 정삭작동 하게 되는 것입니다.

여기서 응답 헤더의 `Set-Cookie` 를 보면 쿠키에 추가적인 값이 설정되었습니다. 이럴 때 실패한 경우 사용된 API에 따라 exception이 발생되게 됩니다.



#### Third-party cookies

CORS의 응답에서 설정된 쿠키는 일반적인 third-party 쿠키 정책이 적용됩니다. 위의 예에서는 페이지가 `foo.example` 로드 되었지만 응답 메세지의 쿠키는 `bar.other` 에서 전송되므로 사용자가 브라우저를 모든 third-party 쿠키를 거부하도록 설정했다면 적용되지 않게 됩니다.

<br>

---

<br>

## The HTTP response headers

이 섹션에서는 Cross-Origin Resource Sharing의 정의에서 제시된 서버가 접근 제어 요청의 응답에 사용하는 HTTP 응답 헤더 리스트가 있습니다.  앞의 내용에서 현 섹션의 내용의 일부가 제공되기도 했습니다.



### Access-Control-Allow-Origin

반환된 리소스는 하나의 [`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) 헤더를 다음과 같이 가질 수 있습니다.

```http
Access-Control-Allow-Origin: <origin> | *
```

`Access-Control-Allow-Origin` 는 단일 origin이 설정된 경우 브라우저에게 해당 특정 origin에서만 리소스 접근이 허용된다는 것을 알려줍니다. 반면 credential 이 없는 요청의 경우  "`*`" wildcard 를 사용할 수 있고, 이를 통해 브라우저에게 모든 origin에서 리소스를 사용 할 수 있다고 알립니다.

예를 들어 `https://mozilla.org` 에서 리소스를 접근하는 코드를 허용하고 싶다면 다음과 같이 할 수 있습니다.

```http
Access-Control-Allow-Origin: https://mozilla.org
Vary: Origin
```

서버가 "`*`" wildcard 가 아닌 단일 origin을 설정한 경우(화이트 리스트로서 요청 origin에 따라 동적으로 값이 변경 될 수 있습니다.), 서버는 `Vary` 응답 헤더에 `Origin`를 포함시켜 클라이언트에게 서버가 `Origin` 요청 헤더에 따라 다른 값을 응답할 것이라 알려야 합니다.

<br>

### Access-Control-Expose-Headers

[`Access-Control-Expose-Headers`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers) 헤더는 브라우저가 접근할 수 있는 헤더를 서버의 whitelist에 추가 할 수 있게 합니다.

```http
Access-Control-Expose-Headers: <header-name>[, <header-name>]*
```

다음과 같은 예가 있습니다.

```http
Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header
```

이 예에서는 `X-My-Custom-Header` 과 `X-Another-Custom-Header` 헤더가 브라우저에 나타나게 됩니다.

<br>

### Access-Control-Max-Age

[`Access-Control-Max-Age`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age) 헤더는 preflight 요청의 결과가 얼마나 오래 캐시될지를  나타냅니다. 

```http
Access-Control-Max-Age: <delta-seconds>
```

여기서  `delta-seconds` 파라미터는 결과를 캐시할 수 있는 초를 나타냅니다.

<br>

### Access-Control-Allow-Credentials

 헤더는 `credentials` 플래그가 true 일 때 요청에 대한 응답이 표시 될 수 있는지를 나타냅니다. preflight 요청에 대한 응답의 일부로 사용되는 경우는 실제 요청이 credential을 사용할 수 있는 지를 나타냅니다. simple `GET` request는 preflight 되지 않으므로, 요청이 credential을 사용하여 만들어 졌는데 헤더가 이 리소스를 반환하지 않게 되면 응답은 브라우저에 의해 무시되고 웹 컨텐츠에도 전달되지 않게 됩니다.

```http
Access-Control-Allow-Credentials: true
```

<br>

### Access-Control-Allow-Methods

[`Access-Control-Allow-Methods`](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Access-Control-Allow-Methods) 헤더는 리소스에 접근할때 사용되는 HTTP 메서드를 지정합니다. 이 헤더는 preflight 요청에 대한 응답에 사용됩니다. 요청이 preflight 되는 조건은 위에서 설명되었습니다.

```http
Access-Control-Allow-Methods: <method>[, <method>]*
```

<br>

### Access-Control-Allow-Headers

[`Access-Control-Allow-Headers`](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Access-Control-Allow-Headers) 헤더도 preflight 요청에 대한 응답으로 사용되며 실제 요청에서 어떤 HTTP 헤더가 사용될 수 있는지를 나타냅니다.

```http
Access-Control-Allow-Headers: <header-name>[, <header-name>]*
```

<br>

---

<br>

## The HTTP request headers

이 섹션에서는 cross-origin sharing을 사용하기 위해 클라이언트가 HTTP 요청을 보낼때 사용될 수 있는 헤더를 다룹니ㅏㄷ. 이 헤더들은 서버를 호출 할 때마다 설정되게 됩니다. Cross-site XHR을 사용하는 개발자는 프로그래밍 시 cross-origin sharing 요청헤더를 설정할 필요는 없습니다.

<br>

### Origin

 [`Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin) 헤더는 cross-site 접근 요청 혹은 preflight 요청을 보낸 origin을 가리킵니다.

```http
Origin: <origin>
```

이 origin은 요청이 생성된 서버를 가리키는 URI 입니다. path 정보는 포함하지 않고 서버의 이름만 표시됩니다.

> **Note** : `origin`은 `null` 혹은 URI가 될 수 있습니다.,

access control 요청에는 **항상** `Origin` 헤더가 전송됩니다.

<br>

### Access-Control-Request-Method

 [`Access-Control-Request-Method`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Request-Method)  헤더는 preflight 요청에서 사용되며 실제 요청에서 어떤 HTTP 메서드를 사용할지 알립니다.

```http
Access-Control-Request-Method: <method>
```

<br>

### Access-Control-Request-Headers

[`Access-Control-Request-Headers`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Request-Headers) 헤더도 preflight 요청에서 사용되며 실제 요청에서 사용되는 HTTP 헤더를 알립니다.

```http
Access-Control-Request-Headers: <field-name>[, <field-name>]*
```

<br><br>

> #### Reference
>
> - [MDN - Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
> - [OTF(Open Type Font)와 TTF(True Type Font)란?](https://m.blog.naver.com/PostView.nhn?blogId=hjkts0602&logNo=221007780005&proxyReferer=https:%2F%2Fwww.google.com%2F)

