---
title: Java Generics - 9
date: "2020-05-11T13:12:03.284Z"
description: "Java의 Generics에 대해 알아봅시다"
thumbnail: "../logo.jpeg"
tags: ["Java", "Generics"]
---

# Restrictions on Generics

Java generics를 효과적으로 사용하기 위해서는 다음과 같은 제한사항을 반드시 숙지해야 합니다.

- [Cannot Instantiate Generic Types with Primitive Types](https://docs.oracle.com/javase/tutorial/java/generics/restrictions.html#instantiate)
- [Cannot Create Instances of Type Parameters](https://docs.oracle.com/javase/tutorial/java/generics/restrictions.html#createObjects)
- [Cannot Declare Static Fields Whose Types are Type Parameters](https://docs.oracle.com/javase/tutorial/java/generics/restrictions.html#createStatic)
- [Cannot Use Casts or `instanceof` With Parameterized Types](https://docs.oracle.com/javase/tutorial/java/generics/restrictions.html#cannotCast)
- [Cannot Create Arrays of Parameterized Types](https://docs.oracle.com/javase/tutorial/java/generics/restrictions.html#createArrays)
- [Cannot Create, Catch, or Throw Objects of Parameterized Types](https://docs.oracle.com/javase/tutorial/java/generics/restrictions.html#cannotCatch)
- [Cannot Overload a Method Where the Formal Parameter Types of Each Overload Erase to the Same Raw Type](https://docs.oracle.com/javase/tutorial/java/generics/restrictions.html#cannotOverload)

<br>

### Cannot Instantiate Generic Types with Primitive Types

다음의 파라미터화된 타입을 살펴보겠습니다.

```java
class Pair<K, V> {

    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    // ...
}
```

Pair 객체를 생성할 때 타입 파라미터 K 혹은 V로 primitive 타입을 사용할 수 없습니다.

```java
Pair<int, char> p = new Pair<>(8, 'a');  // compile-time error
```

타입 파라미터는 non-primitive 타입만 사용이 가능합니다.

```java
Pair<Integer, Character> p = new Pair<>(8, 'a');
```

Java 컴파일러는 위의 구문을 아래와 같이 8을 Integer로, 'a'를 Character로 autobox 해주는 기능이 있습니다.

```java
Pair<Integer, Character> p = new Pair<>(Integer.valueOf(8), new Character('a'));
```

autoboxing에 대해 더 많은 정보가 필요하면 [Numbers and Strings](https://docs.oracle.com/javase/tutorial/java/data/index.html) 의 [Autoboxing and Unboxing](https://docs.oracle.com/javase/tutorial/java/data/autoboxing.html)를 참조하세요.

<br>

### Cannot Create Instances of Type Parameters

type parameter을 통해 인스턴스를 생성할 수 없습니다. 다음 코드는 컴파일 타임 에러가 발생하는 예시입니다.

```java
public static <E> void append(List<E> list) {
    E elem = new E();  // compile-time error
    list.add(elem);
}
```

해결 방법은 reflection을 이용하여 type parameter의 객체를 생성할 수 있습니다.

```java
public static <E> void append(List<E> list, Class<E> cls) throws Exception {
    E elem = cls.newInstance();   // OK
    list.add(elem);
}
```

다음과 같이 append 메서드를 호출할 수 있습니다.

```java
List<String> ls = new ArrayList<>();
append(ls, String.class);
```

<br>

### Cannot Declare Static Fields Whose Types are Type Parameters

클래스의 static 필드는 class-level 변수로 클래스의 모든 non-static 객체들에 의해 공유됩니다. 따라서 static field의 타입 파라미터는 허용되지 않습니다. 다음 클래스를 살펴보겠습니다.

```java
public class MobileDevice<T> {
    private static T os;

    // ...
}
```

static field에서 타입 파라미터 사용이 가능했다면 다음과 같은 코드를 생각하기 복잡해집니다.

```java
MobileDevice<Smartphone> phone = new MobileDevice<>();
MobileDevice<Pager> pager = new MobileDevice<>();
MobileDevice<TabletPC> pc = new MobileDevice<>();
```

static field os가 phone, pager, pc에서 공유되기 때문에 os의 타입이 뭐가 되야하는지 불분명해집니다. 분명한 것은 Smartphone, Pager, TabletPC가 동시에 될수는 없습니다. 따라서 static 필드에서 파라미터 타입을 사용할수 없게 되는 것입니다.

<br>

###  Cannot Use Casts or `instanceof` with Parameterized Types

Java 컴파일러가 제네릭 코드의 모든 타입 파라미터를 지우기 때문에, 런타임에서 generic 타입으로 어떤 파라미터화된 타입이 사용되는지 알 수 없습니다.

```java
public static <E> void rtti(List<E> list) {
    if (list instanceof ArrayList<Integer>) {  // compile-time error
        // ...
    }
}
```

rtti 메서드를 지나는 파라미터화된 타입의 집합은 다음과 같습니다.

```java
S = { ArrayList<Integer>, ArrayList<String> LinkedList<Character>, ... }
```

 런타임은 타입 파라미터를 추적하지 않기 때문에 ArrayList&lt;Integer&gt;와 ArrayList&lt;String&gt;의 차이를 알 수 없습니다. 선택할 수 있는 최적의 방안은 unbounded wildcard를 사용하여 list가 ArrayList라는 것을 확인시켜주는 것입니다.

```java
public static void rtti(List<?> list) {
    if (list instanceof ArrayList<?>) {  // OK; instanceof requires a reifiable type
        // ...
    }
}
```

또 unbounded wildcard가 사용되지 않았다면 파라미터화된 타입을 캐스팅하는 것도 안됩니다. 다음은 그 예시입니다.

```java
List<Integer> li = new ArrayList<>();
List<Number>  ln = (List<Number>) li;  // compile-time error
```

하지만 몇몇 경우에는 컴파일러는 타입 파라미터가 항상 유요하며 캐스팅 할수 있다는 것도 알고 있습니다. 다음은 그 예시입니다.

```java
List<String> l1 = ...;
ArrayList<String> l2 = (ArrayList<String>)l1;  // OK
```

<br>

### Cannot Create Arrays of Parameterized Types

파라미터화된 타입의 배열을 생성할 수 없습니다. 예로 다음 코드는 컴파일되지 않습니다.

```java
List<Integer>[] arrayOfLists = new List<Integer>[2];  // compile-time error
```

다음 코드는 다른 타입이 삽입됐을 때 일어나는 과정을 보여줍니다.

```java
Object[] strings = new String[2];
strings[0] = "hi";   // OK
strings[1] = 100;    // An ArrayStoreException is thrown.
```

같은 동작을 generic list에서 실행 했을 때 문제가 발생합니다.

```java
Object[] stringLists = new List<String>[];  // compiler error, but pretend it's allowed
stringLists[0] = new ArrayList<String>();   // OK
stringLists[1] = new ArrayList<Integer>();  // An ArrayStoreException should be thrown,
                                            // but the runtime can't detect it.
```

파라미터화된 리스트의 배열이 허용됐다면 이전의 코드는 원하는 대로 ArrayStoreException을 발생시키지 못하게 됩니다.

<br>

### Cannot Create, Catch, or Throw Objects of Parameterized Types

제네릭 클래스는 Throwable 클래스를 직접적으로나 간접적으로나 상속받지 못합니다. 예를 들어 다음과 같은 코드는 컴파일되지 않습니다.

```java
// Extends Throwable indirectly
class MathException<T> extends Exception { /* ... */ }    // compile-time error

// Extends Throwable directly
class QueueFullException<T> extends Throwable { /* ... */ // compile-time error
```

메서드는 타입 파라미터의 인스턴스를 catch할 수 없습니다.

```java
public static <T extends Exception, J> void execute(List<J> jobs) {
    try {
        for (J job : jobs)
            // ...
    } catch (T e) {   // compile-time error
        // ...
    }
}
```

하지만 타입 파라미터를 throws 절에서 사용하는 것은 가능합니다.

```
class Parser<T extends Exception> {
    public void parse(File file) throws T {     // OK
        // ...
    }
}
```

<br>

### Cannot Overload a Method Where the Formal Parameter Types of Each Overload Erase to the Same Raw Type

클래스는 type erasure 이후 같아질 두개의 오버로드 메서드를 가질 수 없습니다.

```java
public class Example {
    public void print(Set<String> strSet) { }
    public void print(Set<Integer> intSet) { }
}
```

오버로드는 모두 같은 classfile 표현을 가지게 되고 compile-time 에러를 발생시키게 됩니다.

<br><br>

> #### Reference
>
> - [Oracle : The Java Tutorials - Restrictions on Generics](https://docs.oracle.com/javase/tutorial/java/generics/restrictions.html)

