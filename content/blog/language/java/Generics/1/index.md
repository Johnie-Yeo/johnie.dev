---
title: Java Generics - 1
date: "2020-04-24T22:12:03.284Z"
description: "Java의 Generics에 대해 알아봅시다"
thumbnail: "../logo.jpeg"
tags: ["Java", "Generics"]
---

최근 Java와 Kotlin 관련 프로젝트를 진행하다 Generics관련 이슈로 인해 문제가 지속적으로 발생했었습니다. 별 생각없이 꺽쇠 사이에 내가 원하는 클래스만 쓰는 방식으로 써도 큰 문제는 되지 않지만 그 내부 구조와 활용을 모르면 문제가 생기는 상황이 실제 개발에서는 아주아주 자주 발생하는 것을 경험했고 다시 한번 제대로 공부해봐야겠다는 생각이 들었습니다.

# Generics를 사용해야 하는 이유

Generics는 클래스나 인터페이스 혹은 메서드를 정의할 때 타입(클래스 혹은 인터페이스)을 파라미터로 사용할수 있게 해줍니다.  메서드 정의에 사용되는 친숙한 *formal parameter*과 유사하게 type parameter은 다른 입력 타입에 대해 같은코드를 재활용할수 있는 방법을 제공합니다. 차이점은 formal parameter에서는 value가 전달된다는 점, 하지만 type parameter은 type이 전달되는 점입니다.

Generics를 사용한 코드는 non-generic 코드에 비해 다음과 같은 장점들을 가집니다.

- Strong type checks at compile time.

  Java compiler은 generic 코드에게 강력한 타입 체크를 적용하고 코드가 type safety를 위반하는 것에 대한 에러를 알립니다. complie-time 에러는 runtime 에러에 비해 찾기도 쉽고 해결하기도 쉽습니다.

- Elimination of casts

  다음 코드는 generics가 없을 때 타입캐스팅이 필요한 경우입니다.

  ```Java
  List list = new ArrayList();
  list.add("hello");
  String s = (String) list.get(0);
  ```

  generics를 사용해서 다시 작성된 코드에는 캐스팅이 필요 없습니다.

  ```Java
  List<String> list = new ArrayList<String>();
  list.add("hello");
  String s = list.get(0);
  ```

- Enabling programmers to implement generic algorithms.

  generics를 사용하여 프로그래머는 generics 알고리즘을 구현함으로써, 서로 다른 타입의 collection에서 작동하고, 커스텀할 수 있으며,  type safe와  readable한 코드를 만들 수 있습니다.

<br>

<br>

> #### Reference
>
> - [Oracle : The Java Tutorials](https://docs.oracle.com/javase/tutorial/java/generics/why.html)

