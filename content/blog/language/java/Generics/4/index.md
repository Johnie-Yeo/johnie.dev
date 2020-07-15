---
title: Java Generics - 4
date: "2020-05-03T23:12:03.284Z"
description: "Java의 Generics에 대해 알아봅시다"
thumbnail: "../logo.jpeg"
tags: ["Java", "Generics"]
---

# Bounded Type Parameters

타입을 파라미터화 할때 제한된 type argument를 원하는 경우가 있습니다. 예를 들어 숫자에서 작동하는 메서드는 Number 혹은 그 하위 클래스만 인스턴스로 허용하려 합니다. 이것이 *Bounded Type Parameter*가 필요한 이유입니다.

bounded type parameter을 선언하기 위해서는 타입 파라미터의 이름을 `extends` 키워드와 함께 최상위 클래스를(여기서는 Number) 나열해야 합니다. 중요한 것은 여기서는 `extends`는 일반적인 의미로 클래스의 extends, 인터페이스의 implements 모두를 의미합니다.

```java
public class Box<T> {

    private T t;          

    public void set(T t) {
        this.t = t;
    }

    public T get() {
        return t;
    }

    public <U extends Number> void inspect(U u){
        System.out.println("T: " + t.getClass().getName());
        System.out.println("U: " + u.getClass().getName());
    }

    public static void main(String[] args) {
        Box<Integer> integerBox = new Box<Integer>();
        integerBox.set(new Integer(10));
        integerBox.inspect("some text"); // error: this is still String!
    }
}
```

우리의  generic method를 이 bounded type parameter를 포함하도록 수정하면 inspect의 호출이 String을 포함하고 있기에 컴파일 에러가 발생하게 됩니다.

```
Box.java:21: <U>inspect(U) in Box<java.lang.Integer> cannot
  be applied to (java.lang.String)
                        integerBox.inspect("10");
                                  ^
1 error
```

또 타입을 제한하는 것은 generic type을 인스턴스화할 수 있게 해주는데, bounded type parameter이 bound 내에 정의되어 있는 메서드 호출을 허용하기 때문입니다.

```java
public class NaturalNumber<T extends Integer> {

    private T n;

    public NaturalNumber(T n)  { this.n = n; }

    public boolean isEven() {
        return n.intValue() % 2 == 0;
    }

    // ...
}
```

이 `isEven` 메서드는 n을 통하여 Integer 클래스에서 정의되어 있는  `intValue` 메서드를 호출하는 것입니다.

<br>

## Multiple Bounds

---

앞의 예는 단일 bound를 이용한 타입 파라미터를 사용하는 것을 보여주지만, type parameter은 여러 bound를 가질 수 있습니다.

```java
<T extends B1 & B2 & B3>
```

여러 bound를 가진 타입 변수는 bound 에 있는 모든 타입 리스트의 subtype입니다. 이때 한 bound가 클래스라면 해당 bound가 가장 먼저 나타나야 합니다. 다음은 그 예시입니다.

```java
Class A { /* ... */ }
interface B { /* ... */ }
interface C { /* ... */ }

class D <T extends A & B & C> { /* ... */ }
```

A가 가장 먼저 나오지 않았다면 compile-time error를 만나게 됩니다.

```java
class D <T extends B & A & C> { /* ... */ }  // compile-time error
```

<br>

<br>

# Generic Methods and Bounded Type Parameters

Bounded type parameter은 generic 알고리즘 구현에 있어 중요한 역할입니다. 다음과 같은 배열 T[]에서 elem 보다 큰 요소의 갯수를 세는 메서드를 보세요.

```java
public static <T> int countGreaterThan(T[] anArray, T elem) {
    int count = 0;
    for (T e : anArray)
        if (e > elem)  // compiler error
            ++count;
    return count;
}
```

메서드 구현은 간단하지만 컴파일에는 실패하게됩니다. `>` 라는 연산자는 primitive 타입인 short, int, double, long, float, byte, char 등에서만 작동하기 때문입니다. 객체간 비교에 있어서는 &gt; 를 사용할 수 없습니다. 이 문제를 해결하려면 Comparable&lt;T&gt; 인터페이스를 이용하여 type paramter bounded를 사용해야 합니다.

```java
public interface Comparable<T> {
    public int compareTo(T o);
}
```

그 결과 다음과 같이 사용할 수 있습니다.

```java
public static <T extends Comparable<T>> int countGreaterThan(T[] anArray, T elem) {
    int count = 0;
    for (T e : anArray)
        if (e.compareTo(elem) > 0)
            ++count;
    return count;
}
```

<br>

<br>

> #### Reference
>
> - [Oracle : The Java Tutorials - Bounded Type Parameters](https://docs.oracle.com/javase/tutorial/java/generics/bounded.html)
> - [Oracle : The Java Tutorials - Generic Methods and Bounded Type Parameters](https://docs.oracle.com/javase/tutorial/java/generics/boundedTypeParams.html)

