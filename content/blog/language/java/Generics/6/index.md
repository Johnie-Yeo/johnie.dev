---
title: Java Generics - 6
date: "2020-05-05T12:12:03.284Z"
description: "Java의 Generics에 대해 알아봅시다"
thumbnail: "../logo.jpeg"
tags: ["Java", "Generics"]
---

# Type Inference

*Type inference*(타입 추론)은 Java 컴파일러의 능력으로서 각 메서드 호출과 해당 선언문을 보고 호출에서 적용할 type argument을 결정하는 것을 말합니다. 추론 알고리즘은 타입의 인자와 가능한경우에는 결과에 할당되거나 리턴되는 타입을 결정합니다. 최종적으로는  추론 알고리즘은 모든 인자와 함께 작동하는 가장 정확한 타입을 찾으려고 합니다.

마지막 포인트는 다음 예제와 함께 설명하겠습니다. 예제를 보면 추론(inference)은 pick 메서드에 전달되는 두번째 인자가 Serializable 타입인 것으로 판별합니다.

```java
static <T> T pick(T a1, T a2) { return a2; }
Serializable s = pick("d", new ArrayList<String>());
```

<br>

## Type Inference and Generic Methods

---

[Generic Methods](../3)에서 type inference를 통해 generic 메서드가 일반 메서드처럼 꺽쇠 괄호 없이 사용가능하다고 했습니다. 다음의 [Box](https://docs.oracle.com/javase/tutorial/java/generics/examples/Box.java)클래스를 이용한 [Box Demo](https://docs.oracle.com/javase/tutorial/java/generics/examples/BoxDemo.java) 예제를 살펴보겠습니다.

```java
import java.util.List;
import java.util.ArrayList;

public class BoxDemo {

  public static <U> void addBox(U u, List<Box<U>> boxes) {
    Box<U> box = new Box<>();
    box.set(u);
    boxes.add(box);
  }

  public static <U> void outputBoxes(List<Box<U>> boxes) {
    int counter = 0;
    for (Box<U> box: boxes) {
      U boxContents = box.get();
      System.out.println("Box #" + counter + " contains [" +boxContents.toString() + "]");
      counter++;
    }
  }

  public static void main(String[] args) {
    ArrayList<Box<Integer>> listOfIntegerBoxes = new ArrayList<>();
    BoxDemo.<Integer>addBox(Integer.valueOf(10), listOfIntegerBoxes);
    BoxDemo.addBox(Integer.valueOf(20), listOfIntegerBoxes);
    BoxDemo.addBox(Integer.valueOf(30), listOfIntegerBoxes);
    BoxDemo.outputBoxes(listOfIntegerBoxes);
  }
}
```

이 예제의 출력은 다음과 같습니다.

```
Box #0 contains [10]
Box #1 contains [20]
Box #2 contains [30]
```

generic 메서드인 addBox는 U라는 이름의 타입 파라미터를 정의합니다. 일반적으로 Java 컴파일러는 generic 메서드 호출에서 타입 파라미터를 추론할 수 있습니다. 결과적으로 대부분의 경우 타입을 특정지을 필요가 없습니다. 예를 들어 addBox라는 generic 메서드를 호출하기 위해 다음과 같이 타입 파라미터를 *type witness*로 구체화 할 수 있습니다.

```java
BoxDemo.<Integer>addBox(Integer.valueOf(10), listOfIntegerBoxes);
```

하지만 type witness를 생략하더라도 Java 컴파일러는 자동으로 메서드의 인자를 통해 타입 파라미터가 Integer라는 사실을 추론합니다.

```java
BoxDemo.addBox(Integer.valueOf(20), listOfIntegerBoxes);
```

<br>

## Type Inference and Instantiation of Generic Classes

---

컴파일러가 컨텍스트에서 type argument를 inference할수 있는 한, generic 클래스의 생성자를 호출할때 필요한 type argument를 빈 타입 파라미터(&lt;&gt;)로 쓸수 있습니다. 이 꺽쇠괄호 쌍을 비공식적으로는 diamond라고 합니다. 

예를 들어 다음 변수 선언을 보겠습니다.

```java
Map<String, List<String>> myMap = new HashMap<String, List<String>>();
```

 생성자의 매개변수화 된 타입을 다음과 같이 빈 타입 파라미터 집합(<>)으로 대체할 수 있습니다.

```java
Map<String, List<String>> myMap = new HashMap<>();
```

generic 클래스를 인스턴스화할 때 type inference를 적극적으로 활용하고 싶다면 diamond의 사용은 필수적입니다. 다음 예에서 컴파일러는 unchecked conversion warning을 생성하는데, `HashMap()` 생성자가 Map&lt;String, List&lt;String&gt;&gt; 타입이 아닌 HashMap raw type을 참조하기 때문입니다.

```java
Map<String, List<String>> myMap = new HashMap(); // unchecked conversion warning
```

<br>

## Type Inference and Generic Constructors of Generic and Non-Generic Classes

---

생성자는 generic 클래스, non-generic 클래스 모두에서 generic일 수 있습니다.(즉, 자체적인 타입 파라미터를 선언할 수 있습니다.) 다음 예제를 통해 살펴보겠습니다.

```java
class MyClass<X> {
  <T> MyClass(T t) {
    // ...
  }
}
```

MyClass 클래스에 대한 다음 인스턴스화를 보겠습니다.

```java
new MyClass<Integer>("")
```

이 구문은 파라미터화된 타입 `MyClass<Integer>`의 인스턴스를 생성합니다. 이 구문은 Integer 타입을 generic 클래스 MyClass&lt;X&gt;의 X에 대한 타입으로서 명시적으로 지정한 것입니다. 주목할 점은 generic 클래스의 생성자는 T라는 공식 타입 파라미터를 가집니다. 이때 컴파일러는 제네릭 클래스의 생성자의 타입 파라미터 T에 대해 String 타입임을 추론합니다.(이 생성자의 실제 파라미터가 String 객체이기 때문)

Java SE 7 이전에 릴리즈된 컴파일러는 제네릭 생성자의 실제 타입 파라미터를 제네릭 메서드에서와 같이 추론할 수 있었습니다. 하지만 SE 7 이후 컴파일러에서는 diamond(&lt;&gt;)를 사용했을 때, 인스턴스화된 제네릭 클래스의 실제 파라미터를 통해 추론이 가능합니다. 다음 예제를 보세요.

```java
MyClass<Integer> myObject = new MyClass<>("");
```

이 예에서는 컴파일러는 generic 클래스 MyClass&lt;X&gt;의 공식 타입 파라미터 X가 Integer이라는 것을 추론합니다. 또 제네릭 클래스의 생성자의 공식 타입 파라미터 T는 String으로 추론됩니다.

> #### Note
>
> inference 알고리즘은 호출 인자, 타겟 타입, 타입 추론에 의해 거의 확실한 반환 타입에만 사용된 다는 점에 주목해야 합니다. inference 알고리즘은 프로그램의 결과를 위해 사용되지는 않습니다.

<br>

## Target Types

---

Java 컴파일러는 target typing을 활용하여 제네릭 메서드 호출의 타입 파라미터를 유추합니다.  표현식의 *target type*은 표현식이 나타나는 위치에 따라 Java 컴파일러가 예상하는 데이터 타입입니다. 다음에 정의된 Collections.emptyList 메서드를 예로 보겠습니다.

```java
static <T> List<T> emptyList();
```

다음과 같이 할당한다고 해봅시다.

```java
List<String> listOne = Collections.emptyList();
```

이 구문은 List&lt;String&gt;의 인스턴스가 오기를 기대하는데 이 List&lt;String&gt; 타입이 **target type**입니다. emptyList 메서드가 List&lt;T&gt; 타입을 반환하기 때문에 컴파일러는 type argument T가 String일 것으로 유추합니다. 이러한 작업은 Java SE 7, 8 모두에서 적용됩니다. 대안으로는 type witness를 이용하여 T를 명시적으로 나타내는 방법이 있습니다.

```java
List<String> listOne = Collections.<String>emptyList();
```

하지만 이 문맥에서 이것은 불필요한 작업입니다. 다음과 같은 다른 상황에서는 필요한 작업일 수 있습니다.

```java
void processStringList(List<String> stringList) {
    // process stringList
}
```

empty list을 통해 processStringList 메서드를 호출한다고 가정해보겠습니다. Java SE 7에서는 다음 구문은 컴파일되지 않습니다.

```java
processStringList(Collections.emptyList());
```

Java SE 7 컴파일러에서는 다음과 유사한 에러메세지가 생길 것입니다.

```
List<Object> cannot be converted to List<String>
```

컴파일러는 type argument T에 대한 값을 필요로 하므로 Object로부터 그 값이 시작됩니다. 결과적으로 Collections.emptyList의 호출은 processStringList 메서드와 호환되지 않는 List&lt;Object&gt; 타입이 반환됩니다. 따라서 Java SE7에서는 다음과 같이 type argument의 값을 설정해야 합니다.

```java
processStringList(Collections.<String>emptyList());
```

하지만 Java SE 8부터는 이러한 작업이 필요 없습니다. target type이 무엇인지에 대한 개념은 `processStringList` 메서드 인자에서와 같이 메서드 인자를 포함하도록 확대되었습니다. 이 예에서 `processStringList` 은 argument 타입을 List&lt;String&gt;으로 요구합니다. Collections.emptyList 메서드는 List&lt;T&gt;를 반환하고 따라서 target type인 List&lt;String&gt;을 이용하여 컴파일러가 type argument T가 String일 것으로 유추하게 됩니다. 따라서 Java SE 8에서는 다음 구문또한 컴파일이 가능합니다.

```java
processStringList(Collections.emptyList());
```

 [Lambda Expressions](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html)의 [Target Typing](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html#target-typing)을 참조하면 더 자세한 정보가 있습니다.

<br><br>

> #### Reference
>
> - [Oracle : The Java Tutorials - Type Inference](https://docs.oracle.com/javase/tutorial/java/generics/genTypeInference.html)

