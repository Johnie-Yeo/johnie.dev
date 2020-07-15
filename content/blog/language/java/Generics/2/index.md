---
title: Java Generics - 2
date: "2020-05-02T22:12:03.284Z"
description: "Java의 Generics에 대해 알아봅시다"
thumbnail: "../logo.jpeg"
tags: ["Java", "Generics"]
---

# Generic Types

*generic type* 은 type이 파라미터로된 generic class 혹은 interface입니다. 다음의 `Box` 클래스는 해당 개념을 설명하기 위해 수정 될 클래스입니다. 

<br>

## A Simple Box Class

---

모든 타입의 객체에서 작동하는 non-generic Box 클래스를 통해 시험하며 시작해보겠습니다. 이 클래스는 객체를 box에 추가하는 set과 객체를 가져오는 get, 이 두가지 메서드만 가집니다.

```java
public class Box {
    private Object object;

    public void set(Object object) { this.object = object; }
    public Object get() { return object; }
}
```

이 클래스의 메서드가 Object를 받아들이거나 반환하기 때문에 primitive type이 아닌 객체는 원하는대로 자유롭게 사용할 수 있습니다. 이는 컴파일 타임에는 클래스가 어떻게 사용되는지 알 수가 없기 때문에 문제가 됩니다. 코드의 한 부분에서는 box에 Integer을 넣고 Integer가 나오기를 기대하지만, 다른 파트에서는 실수로 String을 전달하여 런타임 오류가 발생할 수 있습니다.

<br>

## A Generic Version of the Box Class

---

generic class는 다음과 같이 정의됩니다.

```java
class ClassName<T1, T2, ..., Tn>{
    /* ... */
}
```

타입 파라미터의 자리는 꺽쇠(&lt;&gt;)로 구분되고 클래스 이름 뒤쪽에 위치합니다. 타입 파라미터(a.k.a. *type variables*)는 T1, T2, ... Tn 와 같이 지정됩니다.

Box 클래스를 generics를 사용하도록 변경하기 위해서는, `public class Box` 부분의 코드를 `public class Box<T>` 와 같이 변경하여 generic type 선언을 만들어야 합니다. 이것은 type 변수 T를 소개하며 클래스 내부 어디에서라도 쓰일 수 있게 합니다.

이러한 변화와 함께 Box 클래스는 다음과 같이 변경됩니다.

```java
/**
 * Generic version of the Box class.
 * @param <T> the type of the value being boxed
 */
public class Box<T> {
    // T stands for "Type"
    private T t;

    public void set(T t) { this.t = t; }
    public T get() { return t; }
}
```

보다시피 Object가 등장한 모든 부분은 T로 대체됩니다. 타입변수는 사용자가 지정한 어떠한 **non-primitive** 타입이 될 수 있습니다. 모든 클래스 타입, 인터페이스 타입, 배열 타입, 심지어 다른 타입변수도 가능합니다.

동일한 기법을 통해 generic interface에도 적용할 수 있습니다.

<br>

## Type Parameter Naming Conventions

---

컨벤션에 의해 타입 파라미터의 이름은 하나글자의 대문자입니다. 이것은 기존에 알려진 변수 네이밍 컨벤션과 큰 대조를 이룹니다. 이렇게 함으로써 얻어지는 장점은 타입 변수를 일반 클래스 혹은 인터페이스의 이름과 쉽게 구분할 수 있다는 것입니다.

일반적으로 사용되는 타입 파라미터의 이름은 다음과 같습니다.

- E - Element   (Java Collections Framework에서 많이 사용)
- K - Key
- N - Number
- T - Type
- V - Value
- S, U, V etc. - 2nd, 3rd, 4th types

이 이름은 Java SE API 및 Generics를 학습하는 많은 과정에서 사용됩니다.

<br>

## Invoking and Instantiating a Generic Type

---

generic Box 클래스를 코드에서 참조하기 위해서는 T를 Integer와 같이 구체으로 명시하는 *generic type invocation*(제네릭 타입 호출)을 해야 합니다.

```java
Box<Integer> integerBox;
```

제네릭 타입 호출은 일반적인 메서드 호출과 비슷해 보이지만 메서드의 경우 인자를 전달하고 제네릭 타입 호출은 타입 인자(여기서는 Integer)을 Box 클래스 자체에 전달한다는 점에서 다릅니다.

> **Type Parameter and Type Argument Terminology(용어)**
>
> 많은 개발자들이 "type parameter(매개변수)"과 "type argument(인자)"라는 용어를 뒤섞어 사용하는데 이 용어들은 같은 뜻이 아닙니다. 코딩할때 type  argument는 파라미터화된 타입을 생성하기 위해 사용됩니다. 그러므로 Foo&lt;T&gt;의 T는 type parameter이고 Foo&lt;String&gt; f의 String은 type argument입니다. generics을 배우기 위해서는 이러한 용어의 정의를 준수해야합니다.

다른 변수선언과 마찬가지로 이 코드는 Box 객체를 실제로 생성한 것이 아닙니다. 단순히 integerBox가 Box&lt;Integer&gt;을 읽기 위해 Integer의 Box 라는 참조를 가지고 있다는 것을 선언한 것 뿐입니다.

generic type 호출은 일반적으로 파라미터화된 타입으로도 알려져있습니다.

이 클래스를 인스턴스화하기 위해서는 보통처럼 `new`키워드를 사용하지만 &lt;Integer&gt;을 클래스 이름과 괄호 사이에 넣어줘야 합니다.

```java
Box<Integer> intergerBox = new Box<Integer>();
```

<br>

## The Diamond

---

Java SE 7 이후로 컴파일러가 컨텍스트에서 type argument를 판단하거나 유추할 수 있는 한, 일반 클래스의 생성자를 호출하기 위해 필요한 type argument를 empty set of type arguments (<>)로 쓸 수 있습니다. 이 꺽쇠 괄호 쌍을 비공식적으로는 `diamond`라고 합니다. 예를 들어 Box&lt;Integer&gt;의 인스턴스를 생성하기 위해 다음과 같이 쓸 수 있습니다.

```java
Box<Integer> integerBox = new Box<>();
```

diamond의 개념과 type 추론에 관한 더 자세한 정보는 [Type Inference](../6) 를 참조하세요.

<br>

## Multiple Type Parameters

---

이전에 언급한것 처럼, generic class는 여러개의 타입 파라미터를 가질 수 있습니다. generic 인터페이스인 Pair를 implements하는 OrderedPair generic class가 예입니다.

```java
public interface Pair<K, V> {
    public K getKey();
    public V getValue();
}

public class OrderedPair<K, V> implements Pair<K, V> {

    private K key;
    private V value;

    public OrderedPair(K key, V value) {
	this.key = key;
	this.value = value;
    }

    public K getKey()	{ return key; }
    public V getValue() { return value; }
}
```

다음은 OrderedPair클래스의 두 인스턴스를 생성하는 구문입니다.

```java
Pair<String, Integer> p1 = new OrderedPair<String, Integer>("Even", 8);
Pair<String, String>  p2 = new OrderedPair<String, String>("hello", "world");
```

`new OrderedPair<String, Integer>` 코드는 K를 String으로,  V를 Integer로 인스턴스화 합니다. 그러므로 OrderedPair의 생성자의 파라미터 타입은 String과 Integer입니다.  [autoboxing](https://docs.oracle.com/javase/tutorial/java/data/autoboxing.html)으로 인해 String과 int형으로 클래스에 전달되는 것이 가능합니다.

`Diamond`에서 언급한 것 처럼 Java 컴파일러가 K와 V타입을 `OrderedPair<String, Integer>`의 선언으로부터 유추할 수 있기 때문에 다음과 같이 diamond를 사용하여 간결하게 표현도 가능합니다.

```java
OrderedPair<String, Integer> p1 = new OrderedPair<>("Even", 8);
OrderedPair<String, String>  p2 = new OrderedPair<>("hello", "world");
```

generic interface를 생성하기 위해서는 generic class의 컨벤션을 그대로 사용합니다.

<br>

## Parameterized Types

---

타입 파라미터는 파라미터화된 타입(i.e. List&lt;String&gt;)가 올 수도 있습니다. 예를 들어 OrderedPair<K, V>는 다음과 같은 사용이 가능합니다.

```java
OrderedPair<String, Box<Integer>> p = new OrderedPair<>("primes", new Box<Integer>(...));
```

<br>

# Raw Types

`raw type`은 type argument가 없는 generic 클래스나 인터페이스를 말합니다. 예를 들어 generic class Box를 보면

```java
public class Box<T> {
    public void set(T t) { /* ... */ }
    // ...
}
```

Box&lt;T&gt;의 파라미터화된 타입을 생성하기 위해서는 type parameter T에 실제 type argument를 사용해야합니다.

```java
Box<Integer> intBox = new Box<>();
```

실제 type argument가 생략되면 Box&lt;T&gt;의 raw type이 생성됩니다.

```java
Box rawBox = new Box();
```

그러므로 Box는 generic type Box&lt;T&gt;의 raw type입니다. 하지만 non-generic 클래스나 인터페이스의 타입은 raw type이 아닙니다.

Raw type은 레거시 코드에서 많이 등장하는데 많은 API 클래스(Collections 클래스 등)가 JDK5.0 이전에는 generic이 아니였기 때문입니다. raw type을 사용할 때는 Object를 리턴하는 제네릭 이전의 동작을 만나게 됩니다. 이전 버전과 호환성을 위해 파라미터화된 타입을 raw type에 할당하는 것이 가능합니다.

```java
Box<String> stringBox = new Box<>();
Box rawBox = stringBox;               // OK
```

하지만 raw type을 파라미터화된 타입에 할당하려고 하면 경고를 만나게 됩니다.

```java
Box rawBox = new Box();           // rawBox is a raw type of Box<T>
Box<Integer> intBox = rawBox;     // warning: unchecked conversion
```

 또 raw type을 통해 generic type에 정의된 generic 메서드를 호출하려고 해도 경고가 나옵니다.

```java
Box<String> stringBox = new Box<>();
Box rawBox = stringBox;
rawBox.set(8);  // warning: unchecked invocation to set(T)
```

경고는 raw type이 generic type 체크를 피하여 안전하지 않은 코드의 캐치를 런타임에서 하도록 연기한다는 것을 보여줍니다. 따라서 raw type의 사용은 피해야 합니다.

[Type Erasure](https://docs.oracle.com/javase/tutorial/java/generics/erasure.html) 에서는 Java 컴파일러가 raw type을 어떻게 사용하는지에 대한 더 자세한 정보가 나옵니다.

<br>

## Unchecked Error Messages

---

앞서 언급한것처럼 레거시 코드와 generic 코드가 섞였을때 다음과 같은 경고메세지를 만나게 됩니다.

```
Note: Example.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
```

이러한 것은 다음 예에서와 같이 raw type을 사용하는 오래된 API를 사용할 때 발생할 수 있습니다.

```java
public class WarningDemo {
    public static void main(String[] args){
        Box<Integer> bi;
        bi = createBox();
    }

    static Box createBox(){
        return new Box();
    }
}
```

"unchecked"라는 용어는 컴파일러가 type safety를 보장하기 위해 필요한 모든 타입 체크를 수행하기 위한 타입 정보가 충분하지 않다는 말입니다. "unchecked" 경고는 컴파일러가 힌트를 주지만 디폴트로 비활성화 되어있습니다. 모든 "unchecked" 경고를 보기 위해서는 `-Xlint:unchecked`를 이용하여 리컴파일(recompile)해야 합니다.

이전의 예를 `-Xlint:unchecked`와 함께 리컴파일하면 다음과 같은 추가 정보가 표시됩니다.

```
WarningDemo.java:4: warning: [unchecked] unchecked conversion
found   : Box
required: Box<java.lang.Integer>
        bi = createBox();
                      ^
1 warning
```

unchecked 경고를 완전히 비활성화하려면 `-Xlint : -unchecked` 플래그를 사용하면 됩니다. @SuppressWarnings ( "unchecked") 어노테이션은 unchecked  경고를 표시하지 않습니다. @SuppressWarnings 구문에 익숙하지 않다면 [Annotations](https://docs.oracle.com/javase/tutorial/java/annotations/index.html)을 참조하세요.

<br>

<br>

> #### Reference
>
> - [Oracle : The Java Tutorials - Generic Types](https://docs.oracle.com/javase/tutorial/java/generics/types.html)
> - [Oracle : The Java Tutorials - Raw Types](https://docs.oracle.com/javase/tutorial/java/generics/rawTypes.html)

