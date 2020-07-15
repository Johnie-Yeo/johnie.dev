---
title: Java Generics - 8
date: "2020-05-10T13:12:03.284Z"
description: "Java의 Generics에 대해 알아봅시다"
thumbnail: "../logo.jpeg"
tags: ["Java", "Generics"]
---

# Type Erasure

Generics가 Java에 등장한 것은 컴파일 타임에서의 보다 단단한 타입 체크와 generic 프로그래밍을 지원하기 위해서였습니다. generics를 구현하기 위해서는 Java 컴파일러가 다음과 같은 이유로 type erasure을 적용해야 했습니다.

- 제네릭 타입에서의 모든 타입 파라미터는 각각의 bound 혹은 unbounded라면 Object로 대체합니다. 따라서 생성된 바이트코드에는 일반 클래스, 인터페이스, 메서드만 포함됩니다.
- type safety를 유지하기 위해 필요시 type cast를 삽입합니다.
- 확장된 제네릭 타입에서 polymorphism을 유지하기 위해 bridge 메서드를 생성합니다.

Type erasure은 파라미터화된 타입에 대해 새로운 클래스가 생성되지 않게 합니다. 결과적으로 제네릭은 런타임 오버헤드를 발생시키지 않게 됩니다.

<br>

## Erasure of Generic Types

---

type erasure가 진행되는 동안 Java 컴파일러는 모든 타입 파라미터를 지우고 bound되었다면 각각의 첫번째 bound로, 아니라면 Object 클래스로 대체합니다. 

다음의 링크드 리스트의 단일 노드를 표현하는 제네릭 클래스를 보겠습니다.

```java
public class Node<T> {

    private T data;
    private Node<T> next;

    public Node(T data, Node<T> next) {
        this.data = data;
        this.next = next;
    }

    public T getData() { return data; }
    // ...
}
```

타입 파라미터 T가 unbounded 되었기 때문에 Java 컴파일러는 이것을 Object 클래스로 대체합니다.

```java
public class Node {

    private Object data;
    private Node next;

    public Node(Object data, Node next) {
        this.data = data;
        this.next = next;
    }

    public Object getData() { return data; }
    // ...
}
```

다음 예에서는 제네릭 Node 클래스가 bounded type parameter을 사용합니다.

```java
public class Node<T extends Comparable<T>> {

    private T data;
    private Node<T> next;

    public Node(T data, Node<T> next) {
        this.data = data;
        this.next = next;
    }

    public T getData() { return data; }
    // ...
}
```

Java 컴파일러는 bounded type parameter T를 첫번째 bounded 클래스(인터페이스)인 Comparable로 대체합니다.

```java
public class Node {

    private Comparable data;
    private Node next;

    public Node(Comparable data, Node next) {
        this.data = data;
        this.next = next;
    }

    public Comparable getData() { return data; }
    // ...
}
```

<br>

## Erasure of Generic Methods

---

Java 컴파일러는 제네릭 메서드 인자의 타입 파라미터도 지웁니다. 다음 메서드의 예를 보겠습니다.

```java
// Counts the number of occurrences of elem in anArray.
//
public static <T> int count(T[] anArray, T elem) {
    int cnt = 0;
    for (T e : anArray)
        if (e.equals(elem))
            ++cnt;
        return cnt;
}
```

T가 unbound 되었기 때문에 Java 컴파일러는 Object로 대체합니다.

```java
public static int count(Object[] anArray, Object elem) {
    int cnt = 0;
    for (Object e : anArray)
        if (e.equals(elem))
            ++cnt;
        return cnt;
}
```

다음과 같은 클래스가 정의되었다고 가정해 보겠습니다.

```java
class Shape { /* ... */ }
class Circle extends Shape { /* ... */ }
class Rectangle extends Shape { /* ... */ }
```

이때 각각 다른 모양을 그리기 위해 제네릭 메서드를 쓸 수 있습니다.

```java
public static <T extends Shape> void draw(T shape) { /* ... */ }
```

Java 컴파일러는 T를 Shape으로 대체하게 됩니다.

```java
public static void draw(Shape shape) { /* ... */ }
```

<br>

## Effects of Type Erasure and Bridge Methods

---

때때로는 type erasure로 인해 예측하지 못한 상황을 만나기도 합니다. 다음은 이러한 경우의 예입니다. 예제([Bridge Methods](https://docs.oracle.com/javase/tutorial/java/generics/bridgeMethods.html#bridgeMethods) 에 설명됨)는 컴파일러가 가끔 synthetic 메서드를 생성하는 것을 보여줍니다. 이러한 메서드를 bridge 메서드라 하며 type erasure의 처리과정중 하나입니다.

다음 두 클래스를 보겠습니다.

```java
public class Node<T> {

    public T data;

    public Node(T data) { this.data = data; }

    public void setData(T data) {
        System.out.println("Node.setData");
        this.data = data;
    }
}

public class MyNode extends Node<Integer> {
    public MyNode(Integer data) { super(data); }

    public void setData(Integer data) {
        System.out.println("MyNode.setData");
        super.setData(data);
    }
}
```

여기서 다음 코드를 따라가보세요.

```java
MyNode mn = new MyNode(5);
Node n = mn;            // A raw type - compiler throws an unchecked warning
n.setData("Hello");     
Integer x = mn.data;    // Causes a ClassCastException to be thrown.
```

type erasure 이후 이 코드는 다음과 같이 변환됩니다.

```java
MyNode mn = new MyNode(5);
Node n = (MyNode)mn;         // A raw type - compiler throws an unchecked warning
n.setData("Hello");
Integer x = (String)mn.data; // Causes a ClassCastException to be thrown.
```

다음은 실행된 코드에서 일어난 일에 대한 설명입니다.

- `n.setData("Hello");`는 `setData(Object)`메서드가 MyNode 클래스의 객체에서 실행되게 합니다.(여기서 MyNode 클래스는 Node에서 `setData(Object)`를 상속받았습니다.)
- `setData(Object)`의 body에서는 n을 참조하는 객체의 데이터 필드가 String으로 할당됩니다.
- 같은 객체의 데이터 필드는 `mn`을 참조하여 integer로 접근이 가능하며 integer가 될 것으로 알고 있습니다.(`mn`이 Node&lt;MyNode&gt;인 MyNode이기 때문)
- String을 Integer에 할당하려고 하는것 때문에 Java 컴파일러가 할당하여 삽입한 cast에서 ClassCastException이 발생하게 됩니다.

<br>

### Bridge Methods

파라미터화된 클래스 혹은 인터페이스를 상속받은 클래스나 인터페이스를 컴파일할 때 컴파일러는 synthetic 메서드를 생성해야할 수도 있습니다. 이러한 메서드를 *bridge method* 라 하며 type erasure 처러의 한 부분입니다. 일반적으로 bridge 메서드에 대해서는 신경쓸 필요가 없습니다. 하지만 stack trace에 이것이 표시되면 당황스러울수도 있습니다.

type erasure 이후 Node와 MyNode는 다음과 같이 바뀌게 됩니다.

```java
public class Node {

    public Object data;

    public Node(Object data) { this.data = data; }

    public void setData(Object data) {
        System.out.println("Node.setData");
        this.data = data;
    }
}

public class MyNode extends Node {

    public MyNode(Integer data) { super(data); }

    public void setData(Integer data) {
        System.out.println("MyNode.setData");
        super.setData(data);
    }
}
```

type erasure 이후 메서드는 서로 매치되지 않게 됩니다. Node의 메서드는 `setData(Object)`가 되고 MyNode의 메서드는 `setData(Integer)`가 됩니다. 따라서 MyNode의 setData는 Node의 setData를 override 하지 않게 됩니다.

이 문제를 해결하고 type erasure 이후 제네릭 타입에서 [polymorphism](https://docs.oracle.com/javase/tutorial/java/IandI/polymorphism.html)을 유지하기 위해서 Java 컴파일러가 bridge 메서드를 생성하여 subtyping이 원하는대로 되도록 보장해줍니다. MyNode 클래스에서 컴파일러는 다음과 같이 setData를 위한 bridge 메서드를 만듭니다.

```java
class MyNode extends Node {

    // Bridge method generated by the compiler
    //
    public void setData(Object data) {
        setData((Integer) data);
    }

    public void setData(Integer data) {
        System.out.println("MyNode.setData");
        super.setData(data);
    }

    // ...
}
```

보는 바와 같이 bridge 메서드는 type erasure 이후 Node 클래스에서의 setData메서드와 같은 이름의 메서드를 가지고 원래의 setData 메서드의 역할을 대신해주게 됩니다.

<br>

## Non-Reifiable Types

---

현 Type Erasure 섹션에서는 컴파일러가 type parameter와 type argument에 대한 정보를 지우는 프로세스에 대해 설명했습니다. Type erasure는 variable arguments(A.K.A. *varargs*)메서드와 관련된 결과를 갖습니다. 여기서 varargs 메서드는 varargs 형식 매개변수가 비구체화(non-reifiable) 타입을 갖는 것을 말합니다. varargs 메서드에 대한 더 많은 정보는 [Passing Information to a Method or a Constructor](https://docs.oracle.com/javase/tutorial/java/javaOO/arguments.html)의 [Arbitrary Number of Arguments](https://docs.oracle.com/javase/tutorial/java/javaOO/arguments.html#varargs)를 참조하세요.

여기에서는 다음 주제에 대해 다룹니다.

- [Non-Reifiable Types](https://docs.oracle.com/javase/tutorial/java/generics/nonReifiableVarargsType.html#non-reifiable-types)
- [Heap Pollution](https://docs.oracle.com/javase/tutorial/java/generics/nonReifiableVarargsType.html#heap_pollution)
- [Potential Vulnerabilities of Varargs Methods with Non-Reifiable Formal Parameters](https://docs.oracle.com/javase/tutorial/java/generics/nonReifiableVarargsType.html#vulnerabilities)
- [Preventing Warnings from Varargs Methods with Non-Reifiable Formal Parameters](https://docs.oracle.com/javase/tutorial/java/generics/nonReifiableVarargsType.html#suppressing)

<br>

### Non-Reifiable Types

*reifiable* 타입은 런타임에 타입의 정보가 충분한 타입을 말합니다. reifiable 타입에는 primitive 타입, non-generic 타입, raw 타입, unbound wildcard 호출 등이 있습니다.

*Non-reifiable* 타입은 타입의 정보가 컴파일타임에서 type erasure의 호출에 의해 정보가 지워진 unbounded wildcard와 같이 정의되지 않은 generic type을 말합니다. non-reifiable 타입은 런타임에는 어떠한 가용한 정보도 가지고 있지 않습니다. non-reifiable 타입의 예시는 List&lt;String&gt; 과 List&lt;Number&gt; 로, JVM은 런타임에 이 두 타입의 차이를 전혀 알지 못합니다. [Restrictions on Generics](https://johnie-yeo.github.io/hello/language/2020/05/10/Java-Generics-9.html) 에도 이에 대한 설명이 있지만, non-reifiable 타입이 사용될 수 없는 몇몇 경우가 있습니다.  (ex. instanceof 표현식 혹은 배열의 요소) 

<br>

### Heap Pollution

Heap Pollution은 파라미터화 된 타입의 변수가 해당 파라미터화된 타입이 아닌 객체를 참조할 때 발생합니다. 이런 상황은 프로그램이 컴파일 타임에 unchecked warning을 발생시키는 작업을 수행하는 경우 발생합니다. unchecked warning은 컴파일타임(type checking 에서 한정) 혹은 런타임에서 파라미터화된 타입과 관련된 동작의 정합성(ex. cast 혹은 메서드 호출)이 검증되지 못할 때 발생합니다. 예를 들어 heap pollution은 raw 타입과 파라미터화된 타입이 섞여 사용되거나 uncheked cast가 사용된 경우 발생하게 됩니다.

일반적인 경우에 모든 코드가 동시에 컴파일 될 때 컴파일러는 unchecked warning을 표시함으로써 잠재적인 heap pollution에 대해 우리가 주의를 갖게 합니다. 만약 코드를 나누어 컴파일 한다면 heap pollution에 대한 잠재적 위험성을 탐지하는 것은 어렵습니다. 경고 없이 코드를 컴파일하면 heap pollution도 일어나지 않게 됩니다.

<br>

### Potential Vulnerabilities of Varargs Methods with Non-Reifiable Formal Parameters

vararg 입력 파라미터를 포함한 Generic 메서드는 heap pollution을 유발할 수도 있습니다.

다음 ArrayBuilder 클래스를 통해 보겠습니다.

```java
public class ArrayBuilder {

  public static <T> void addToList (List<T> listArg, T... elements) {
    for (T x : elements) {
      listArg.add(x);
    }
  }

  public static void faultyMethod(List<String>... l) {
    Object[] objectArray = l;     // Valid
    objectArray[0] = Arrays.asList(42);
    String s = l[0].get(0);       // ClassCastException thrown here
  }

}
```

다음은 HeapPollutionExample이 ArrayBuilder을 사용합니다.

```java
public class HeapPollutionExample {

  public static void main(String[] args) {

    List<String> stringListA = new ArrayList<String>();
    List<String> stringListB = new ArrayList<String>();

    ArrayBuilder.addToList(stringListA, "Seven", "Eight", "Nine");
    ArrayBuilder.addToList(stringListB, "Ten", "Eleven", "Twelve");
    List<List<String>> listOfStringLists = new ArrayList<List<String>>();
    ArrayBuilder.addToList(listOfStringLists, stringListA, stringListB);
    ArrayBuilder.faultyMethod(Arrays.asList("Hello!"), Arrays.asList("World!"));
  }
}
```

컴파일시에는 ArrayBuilder.addToList 메서드의 정의부분에 다음 경고가 생기게 됩니다.

```
warning: [varargs] Possible heap pollution from parameterized vararg type T
```

컴파일러가 varargs 메서드를 만나게 되면 varargs 형식 파라미터를 배열로 변환시킵니다. 하지만 Java 프로그래밍 언어는 파라미터 타입의 배열 생성을 허가하지 않습니다. ArrayBuilder.addToList 메서드에서는 컴파일러가 varargs 형식 파라미터 T... Elements를 형식 파라미터 T[] elements 배열로 변환시킵니다. 하지만 type erasure로 인해 컴파일러는 varargs 형식 파라미터를 Object[] elements로 변환시키게 됩니다. 결과적으로 heap pollution의 가능성이 생기게 되는 것입니다.

다음 구문은 varargs 형식 파라미터 l을 Object 배열 object Args에 할당합니다.

```java
Object[] objectArray = l;
```

이 구문은 heap pollution을 잠재적으로 내재하고 있습니다. varargs 형식 파라미터 l의 파라미터화된 타입과 매치되는 값은 변수 objectArray에 할당할 수 있습니다. 하지만 컴파일러는 이 경우 unchecked warning을 생성하지 않습니다. 컴파일러는 varargs 형식 파라미터 List&lt;String&gt;... l 을 형식 파라미터 List[] l 로 변환할때 이미 경고를 생성했습니다. 따라서 변수 l은 Object[]의 subtype인 List[] 타입을 가지게 되고 이 구문은 유효하게 되는 것입니다.

결과적으로 이 구문에서 표시된대로 objectArray 배열의 컴포넌트에 아무 타입의 List 객체를 넣게 되면 컴파일러는 경고 혹은 에러를 발생시키지 않게 됩니다.

```java
objectArray[0] = Arrays.asList(42);
```

 이 구문은 objectArray의 첫번째 컴포넌트에 Integer 타입의 객체를 가지는 리스트를 할당합니다.

여기서 다음과 같이 ArrayBuilder.faultyMethod를 호출한다고 가정하겠습니다.

```java
ArrayBuilder.faultyMethod(Arrays.asList("Hello!"), Arrays.asList("World!"));
```

런타임에 JVM은 다음과 같이 ClassCastException을 throw 합니다.

```java
// ClassCastException thrown here
String s = l[0].get(0);
```

변수 l의 배열 첫번째 요소에 저장된 객체는 List&lt;Integer&gt; 타입이지만 여기서는 List&lt;String&gt;이 있을 것으로 보고 있습니다.

<br>

### Prevent Warnings from Varargs Methods with Non-Reifiable Formal Parameters

파라미터화된 타입의 파라미터를 가진 varargs 메서드를 선언했고, 메서드의 body에서 varargs 형식 파라미터를 잘못 처리하여 ClassCastException 혹은 비슷한 Exception이 발생하지 않는 것이 보장된다면, static이며 생성자가 아닌 메서드 선언에 다음 어노테이션을 추가하여 컴파일러가 이러한 류의 varargs 메서드에 대해 생성하는 경고를 막을 수 있습니다.

```java
@SafeVarargs
```

@SafeVarargs 어노테이션은 메서드의 계약(약속)을 문서화한 것입니다. 이 어노테이션은 메서드의 구현에서 varargs 형식 파라미터에 대해 부적절한 처리를 하지 않았음을 나타냅니다.

좋은 방법은 아니지만 메서드 선언에 다음과 같은 방법을 통해 경고를 억제할수도 있습니다.

```java
@SuppressWarnings({"unchecked", "varargs"})
```

하지만 이런 방법은 메서드 호출 부분에서 생성되는 경고를 막아주지는 않습니다. @SuppressWarnings 과 같은 구문에 익숙하지 않다면 [Annotations](https://docs.oracle.com/javase/tutorial/java/annotations/index.html)을 참조할 수 있습니다.

<br><br>

> #### Reference
>
> - [Oracle : The Java Tutorials - TypeErasure](https://docs.oracle.com/javase/tutorial/java/generics/erasure.html)
> - [Oracle : The Java Tutorials - Erasure of Generic Types](https://docs.oracle.com/javase/tutorial/java/generics/genTypes.html)
> - [Oracle : The Java Tutorials - Erasure of Generic Methods](https://docs.oracle.com/javase/tutorial/java/generics/genMethods.html)
> - [Oracle : The Java Tutorials - Effects of Type Erasure and Bridge Methods](https://docs.oracle.com/javase/tutorial/java/generics/bridgeMethods.html)
> - [Oracle : The Java Tutorials - Non-Reifiable Types](https://docs.oracle.com/javase/tutorial/java/generics/nonReifiableVarargsType.html)

