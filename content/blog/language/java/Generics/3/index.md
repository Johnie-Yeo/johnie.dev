---
title: Java Generics - 3
date: "2020-05-03T22:12:03.284Z"
description: "Java의 Generics에 대해 알아봅시다"
thumbnail: "../logo.jpeg"
tags: ["Java", "Generics"]
---

# Generic Methods

*Generic method*는 자체 type parameter을 가지는 메서드입니다. 이것은 generic type을 선언할 때와 비슷하지만 type parameter의 스코프는 선언된 메서드 내부에서만 유효하다는 점에서 다릅니다. static과 non-static generic method 뿐만 아니라 generic class의 생성자 모두에서 사용이 가능합니다.

generic method의 구조는 type parameter의 리스트가 꺽쇠괄호로 감싸져있고 리턴타입 이전에 나타나야 합니다. static generic method에서는 type parameter의 위치가 반드시 리턴 타입 이전에 위치해야 합니다.

두 Pair 객체를 비교하는 generic method인 **compare**을 가지는 `Util`이라는 클래스는 다음과 같이 쓸 수 있습니다.

```java
public class Util {
    public static <K, V> boolean compare(Pair<K, V> p1, Pair<K, V> p2) {
        return p1.getKey().equals(p2.getKey()) &&
               p1.getValue().equals(p2.getValue());
    }
}

public class Pair<K, V> {

    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public void setKey(K key) { this.key = key; }
    public void setValue(V value) { this.value = value; }
    public K getKey()   { return key; }
    public V getValue() { return value; }
}
```

이 복잡한 구조를 갖는 메서드는 다음과 같이 사용됩니다.

```java
The complete syntax for invoking this method would be:

Pair<Integer, String> p1 = new Pair<>(1, "apple");
Pair<Integer, String> p2 = new Pair<>(2, "pear");
boolean same = Util.<Integer, String>compare(p1, p2);
```

여기서는 generic method의 타입이 명시적으로 선언되었습니다. 하지만 일반적으로 다음과 같이 생략이 가능하고 컴파일러가 타입을 유추할 수 있습니다.

```java
Pair<Integer, String> p1 = new Pair<>(1, "apple");
Pair<Integer, String> p2 = new Pair<>(2, "pear");
boolean same = Util.compare(p1, p2);
```

이런 기능을 *type inference*라고 하며 꺽쇠괄호를 통한 타입 명시 없이 generic 메서드를 일반 메서드처럼 사용할 수 있습니다. [Type Inference](../6)에서 이에 대해 더 자세히 설명합니다.

<br>

<br>

> #### Reference
>
> - [Oracle : The Java Tutorials - Generic Methods](https://docs.oracle.com/javase/tutorial/java/generics/methods.html)

