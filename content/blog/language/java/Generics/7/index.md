---
title: Java Generics - 7
date: "2020-05-05T13:12:03.284Z"
description: "Java의 Generics에 대해 알아봅시다"
thumbnail: "../logo.jpeg"
tags: ["Java", "Generics"]
---

# Wildcards

generic 코드에서 물음표는 *wildcard* 라고 하며 미지의 타입임을 나타냅니다. wildcard는 다양한 상황에 사용됩니다. 파라미터, 필드 혹은 로컬 변수 타입으로 사용될 수 있습니다. 때로는 리턴 타입으로 wildcard가 사용될 때도 있습니다.(하지만 좋은 프로그래밍 기법이라고 할수는 없습니다.) 하지만 wildcard는 generic 메서드 호출, generic 클래스 인스턴스 생성, supertype의 type argument로는 절대 사용될 수 없습니다.

다음 섹션에서는 wildcard의 더 세부적인 사항과 upper bounded wildcard, lower bounded wildcard, wildcard capture에 대해 다뤄집니다.

<br>

## Upper Bounded Wildcards

---

변수의 제약을 완화하기 위해 upper bounded wildcard를 사용할 수 있습니다. 예를 들어 List&lt;Integer&gt;, List&lt;Double&gt;, List&lt;Number&gt;에 대해 동작하는 메서드를 만든다고 가정해보겠습니다. upper bounded wildcard는 이러한 것을 가능하게 합니다.

upper-bounded wildcard를 선언하기 위해서는 wildcard character('?')+ `extends` + *upper bound*와 같은 구조로 사용해야 합니다. 주목할 점은 이러한 맥락에서는 extends는 포괄적인 의미로 클래스의 extends, 인터페이스의 implements의 역할을 수행하게 됩니다.

Number와 그 subtype인 Integer, Double, Float 등의 리스트에서 작동하는 메서드를 정의하기 위해서는 List<? extends Number> 와 같은 형태로 사용해야 합니다. List&lt;Number&gt;은 List&lt;? extends Number&gt;에 비해 훨씬 엄격한데 전자의 경우 Number 타입의 리스트에만 매칭되는 반면 후자는 Number과 그 subtype에 해당하는 모든 리스트에 매치되기 때문입니다.

다음 process 메서드를 살펴보겠습니다.

```java
public static void process(List<? extends Foo> list){/* ... */}
```

uppper bounded wildcard인 &lt;? extends Foo&gt;는 Foo가 어떤 타입이든 간에 Foo와 하위클래스 모두에 대해 작동하게 합니다. process 메서드는 Foo 타입의 리스트 element에 대해도 얼마든지 접근이 가능합니다.

```java
public static void process(List<? extends Foo> list) {
    for (Foo elem : list) {
        // ...
    }
}
```

foreach절에서는 elem 변수가 리스트 내의 모든 element에 대해 순회합니다.  Foo 클래스 내에서 정의된 어떠한 메서드도 elem을 통해 사용이 가능합니다.

다음의 sumOfList 메서드는 리스트의 숫자들의 합을 반환합니다.

```java
public static double sumOfList(List<? extends Number> list) {
    double s = 0.0;
    for (Number n : list)
        s += n.doubleValue();
    return s;
}
```

다음 코드는 Integer 객체 리스트를 사용하여 `sum = 6.0`을 출력합니다.

```java
List<Integer> li = Arrays.asList(1, 2, 3);
System.out.println("sum = " + sumOfList(li));
```

Double 리스트도 동일하게 동작합니다. 다음의 출력은 `sum = 7.0`입니다.

```java
List<Double> ld = Arrays.asList(1.2, 2.3, 3.5);
System.out.println("sum = " + sumOfList(ld));
```

<br>

## Unbounded Wildcards

---

unbounded wildcard 타입은 List&lt;?&gt;와 같이 wildcard character(?)을 사용함으로써 지정됩니다. 이러한 것을 unknown type의 list라고 합니다. 다음은 unbounded wildcard를 유용하게 사용할 수 있는 두가지 예시입니다.

- Object 클래스의 메서드를 구현하는 메서드를 작성하는 경우

- 코드가 타입 파라미터에 의존하지 않는 제네릭 클래스의 메서드를 사용하는경우

  ex) List.size, List.clear

  실제로 Class&lt;T&gt;의 대부분의 메서드는 T에 의존하지 않기 때문에 Class&lt;?&gt;는 꽤 자주 사용됩니다.

다음 printList 메서드를 보겠습니다.

```java
public static void printList(List<Object> list) {
    for (Object elem : list)
        System.out.println(elem + " ");
    System.out.println();
}
```

printList의 목표는 모든 타입의 list를 출력하는 것인데 이러한 코드로는 원하는것처럼 동작하지 않습니다. 이 코드는 Object 인스턴스의 리스트만 출력이 가능하고 List&lt;Integer&gt;, List&lt;Double&gt;, List&lt;String&gt; 등은 출력이 불가능합니다. 이러한 리스트는 List&lt;Object&gt;의 subtype이 아니기 때문입니다. generic printList 메서드를 사용하기 위해서는 List&lt;?&gt;를 사용해야 합니다.

```java
public static void printList(List<?> list) {
    for (Object elem: list)
        System.out.print(elem + " ");
    System.out.println();
}
```

A가 어떠한 타입이라도 List&lt;A&gt;는 List&lt;?&gt;의 subtype이 되기 때문에 printList를 이용하여 모든 타입의 리스트를 출력할 수 있습니다.

```java
List<Integer> li = Arrays.asList(1, 2, 3);
List<String>  ls = Arrays.asList("one", "two", "three");
printList(li);
printList(ls);
```

> #### Note
>
> 이 예에서 사용중인 [`Arrays.asList`](https://docs.oracle.com/javase/8/docs/api/java/util/Arrays.html#asList-T...-) 메서드는 여기서 다룰만한 주제는 아닙니다. 그냥 이 static factory 메서드는 특정 array를 고정크기의 리스트로 변환해준다는 것만 알면 됩니다.

Generics 문서에서 계속해서 강조하는 만큼 List&lt;Object&gt;와 List&lt;?&gt;가 다르다는 것을 아는 것은 중요합니다. List&lt;Object&gt;에는 Object와 그 하위클래스의 인스턴스가 삽입이 가능합니다. 하지만 List&lt;?&gt;에는 null만 삽입이 가능합니다. 이후 Guidelines for Wildcard Use에서는 특정 상황에서 어떤 종류의 wildcard가 결정되는 방법에 대해 더 자세히 다뤄집니다.

<br>

## Lower Bounded Wildcards

---

Upper Bounded Wildcard 섹션에서는 upper bounded wildcard가 unknown 타입을 특정 타입 혹은 그 subtype으로 제한하고 extends 키워드를 이용하여 나타낸다고 말했습니다. 비슷하게 *lower bounded wildcard* 는 unknown타입을 특정 타입 혹은 그 상위 타입으로 제한할 수 있습니다.

lower bounded wildcards는 wildcard character('?') + `super` 키워드 + lower bound의 구조로 표현됩니다.

ex) <? super A>

> #### Note
>
> upper bound 혹은 lower bound로 지정하는 것은 모두 할 수 있으나 동시에 적용할 수는 없습니다.

리스트에 Integer, Number, Object와 같이 Integer과 그 supertype을 넣을수 있는 메서드를 만든다고 가정해보겠습니다. 이때 List<? super Integer>와 같이 사용할 수 있습니다. List&lt;Integer&gt;은 List&lt;? super Integer&gt;에 비해 더 제한적입니다. 전자는 Integer의 리스트만 허용되지만 후자는 Integer와 그 supertype 모두에 허용되기 때문입니다.

다음 코드는 리스트의 끝에 1부터 10까지 더하는 메서드입니다.

```java
public static void addNumbers(List<? super Integer> list) {
    for (int i = 1; i <= 10; i++) {
        list.add(i);
    }
}
```

Guidelines for Wildcard Use 섹션에서는 upper bounded wildcard와 lower bounded wildcard에 대해 언제 쓰는지에 대한 방향성을 제공합니다.

<br>

## Wildcards and Subtyping

---

[Generics, Inheritance, and Subtypes](../5)에서 설명한 것처럼 generic 클래스 혹은 인터페이스는 해당 타입간에 관계가 있는 것이고 generics 간에는 관계가 생길 수 없습니다. 하지만 wildcard를 사용한다면 generic 클래스 혹은 인터페이스 사이에도 관계를 만들 수 있습니다.

먼저 다음 두 일반(non-generic) 클래스를 보겠습니다.

```java
class A { /* ... */ }
class B extends A { /* ... */ }
```

이로 인해 다음과 같은 코드도 가능합니다.

```java
B b = new B();
A a = b;
```

이 예는 일반 클래스의 상속이 subtyping의 규칙을 따라 가는 것을 보여줍니다. B 클래스는 A를 extends 했기에 A의 subtype입니다. 하지만 이러한 규칙은 generic 타입는 적용할 수 없습니다.

```java
List<B> lb = new ArrayList<>();
List<A> la = lb;   // compile-time error
```

주어진 것은 Integer가 Number의 하위타입이라는 것인데 그렇다면 List&lt;Integer&gt;과 List&lt;Number&gt; 사이에는 어떤 관계가 있을까요?

<p align="center"><img src="./generics-listParent.gif"/></p>

<p align="center">공통의 부모는 List&lt;?&gt; 입니다.</p>

Integer가 Number의 하위클래스라도 List&lt;Integer&gt;는 List&lt;Number&gt;의 하위타입이 아니고 두 타입간에는 아무런 관계가 없습니다. 두 타입의 공통 부모 클래스는 오직 List&lt;?&gt; 만 있습니다.

이 클래스 간에 관계를 만들어 Number의 메서드를 List&lt;Integer&gt;의 element에서 사용하기 위해서는 upper bounded wildcard를 사용할 수 있습니다.

```java
List<? extends Integer> intList = new ArrayList<>();
List<? extends Number>  numList = intList;  // OK. List<? extends Integer> is a subtype of List<? extends Number>
```

Integer가 Number의 하위클래스이고 numList는 Number 객체의 리스트이기 때문에 이제야 intList와 numList간에 관계가 생겼습니다. 다음 표는 List 클래스에 대해 upper 및 lower bounded wildcard를 사용함에 따라 나타나는 관계입니다.

<p align="center"><img src="./generics-wildcardSubtyping.gif" width="300px"/></p>

<p align="center">generic List 클래스 선언에 대한 hierarchy</p>

Guidelines for Wildcard Use 섹션에서는 upper 및 lower bounded wildcard 사용으로 인한 파급효과를 더 자세히 다룹니다.

<br>

## Wildcard Capture and Helper Methods

---

몇몇 경우에 컴파일러는 wildcard의 타입을 유추합니다. 예를 들어 리스트가 List&lt;?&gt;와 같이 정의되었지만 표현식을 평가(판단)할때 컴파일러는 코드에서 특정 타입을 유추합니다. 이러한 시나리오는 *wildcard capture* 라고 합니다.

대부분의 경우 wildcard capture에 대해서는 신경쓸 필요가 없지만 "capture of"라는 구절과 함께 에러메시지가 나올때는 이야기가 다릅니다.

[`WildcardError`](https://docs.oracle.com/javase/tutorial/java/generics/examples/WildcardError.java) 의 예는 컴파일할때 캡쳐 에러를 생성합니다.

```java
import java.util.List;

public class WildcardError {

    void foo(List<?> i) {
        i.set(0, i.get(0));
    }
}
```

이 예에서 컴파일러는 입력 파라미터 i를 Object 클래스로 처리합니다. foo 메서드가 List.set(int, E)를 호출하면 컴파일러가 리스트에 삽입하는 객체의 타입을 확인할 수 없기 때문에 오류가 발생합니다. 이러한 유형의 오류가 발생하면 일반적으로 컴파일러는 잘못된 타입의 변수를 할당하는 것이라고 판단합니다. generics는 이러한 이유로 컴파일 타임에 type safety를 강제하기 위해 Java에 추가되었습니다.

WildcardError의 예는 Oracle JDK 7 javac에서 컴파일 될 때 다음과 같은 오류를 생성합니다.

```
WildcardError.java:6: error: method set in interface List<E> cannot be applied to given types;
    i.set(0, i.get(0));
     ^
  required: int,CAP#1
  found: int,Object
  reason: actual argument Object cannot be converted to CAP#1 by method invocation conversion
  where E is a type-variable:
    E extends Object declared in interface List
  where CAP#1 is a fresh type-variable:
    CAP#1 extends Object from capture of ?
1 error
```

이 예에서 코드는 안전한 작업을 수행하려 합니다. 그래서 어떻게 하면 컴파일러 오류를 해결할 수 있을까요? 정답은 wildcard를 캡처하는 private *helper* 메서드를 통해 해결할 수 있습니다. 이 경우에는 [`WildcardFixed`](https://docs.oracle.com/javase/tutorial/java/generics/examples/WildcardFixed.java)에 표시된대로 private helper 메서드인 fooHelper을 생성하며 해결할 수 있습니다.

```java
public class WildcardFixed {

    void foo(List<?> i) {
        fooHelper(i);
    }

    // Helper method created so that the wildcard can be captured
    // through type inference.
    private <T> void fooHelper(List<T> l) {
        l.set(0, l.get(0));
    }

}
```

helper 메서드 덕분에 컴파일러는 inference을 통해 호출에서 T가 캡쳐변수 `CAP#1`인지 확인합니다. 위의 예는 성공적으로 컴파일 되게 됩니다.

컨벤션에 의해 helper 메서드는 일반적으로 *originalMethodNameHelper* 로 이름을 짓습니다.

이제 조금 더 복잡한 예인 [`WildcardErrorBad`](https://docs.oracle.com/javase/tutorial/java/generics/examples/WildcardErrorBad.java) 를 보겠습니다.

```java
import java.util.List;

public class WildcardErrorBad {

    void swapFirst(List<? extends Number> l1, List<? extends Number> l2) {
      Number temp = l1.get(0);
      l1.set(0, l2.get(0)); // expected a CAP#1 extends Number,
                            // got a CAP#2 extends Number;
                            // same bound, but different types
      l2.set(0, temp);	    // expected a CAP#1 extends Number,
                            // got a Number
    }
}
```

이 예에서는 코드는 unsafe 작용을 시도합니다. 예로 swapFirst 메서드를 다음과 같이 호출한다고 가정해보겠습니다.

```java
List<Integer> li = Arrays.asList(1, 2, 3);
List<Double>  ld = Arrays.asList(10.10, 20.20, 30.30);
swapFirst(li, ld);
```

List&lt;Integer&gt;와 List&lt;Double&gt;가 List &lt;? extends Number&gt;에 들어가려고 하는 경우, Integer 리스트의 항목을 Double 리스트에 넣으려고 하는것은 분명히 오류는 행동입니다.

 Oracle의 JDK javac 컴파일러를 통해 코드를 컴파일하면 다음과 같은 에러가 생성됩니다.

```
WildcardErrorBad.java:7: error: method set in interface List<E> cannot be applied to given types;
      l1.set(0, l2.get(0)); // expected a CAP#1 extends Number,
        ^
  required: int,CAP#1
  found: int,Number
  reason: actual argument Number cannot be converted to CAP#1 by method invocation conversion
  where E is a type-variable:
    E extends Object declared in interface List
  where CAP#1 is a fresh type-variable:
    CAP#1 extends Number from capture of ? extends Number
WildcardErrorBad.java:10: error: method set in interface List<E> cannot be applied to given types;
      l2.set(0, temp);      // expected a CAP#1 extends Number,
        ^
  required: int,CAP#1
  found: int,Number
  reason: actual argument Number cannot be converted to CAP#1 by method invocation conversion
  where E is a type-variable:
    E extends Object declared in interface List
  where CAP#1 is a fresh type-variable:
    CAP#1 extends Number from capture of ? extends Number
WildcardErrorBad.java:15: error: method set in interface List<E> cannot be applied to given types;
        i.set(0, i.get(0));
         ^
  required: int,CAP#1
  found: int,Object
  reason: actual argument Object cannot be converted to CAP#1 by method invocation conversion
  where E is a type-variable:
    E extends Object declared in interface List
  where CAP#1 is a fresh type-variable:
    CAP#1 extends Object from capture of ?
3 errors
```

코드가 근본적으로 잘못되었기에 이러한 문제를 해결해줄 수 있는 helper 메서드도 존재할 수 없습니다.

<br>

## Guidelines for Wildcard Use

---

generics 프로그래밍을 배울때 헷갈리는 것 중 하나는 upper bounded wildcard와 lower bounded wildcard를 어떻게 적재적소에 사용하는지에 대한 것입니다. 여기서는 전반적 코드 구조를 잡을 때 따라야 할 몇가지 가이드라인을 제시합니다.

이런 결정을 위해 도움이 되는 것은 변수가 다음 두 기능 중 하나를 제공한다고 생각하면 좋습니다.

### AN "In" Variable

- "In" 변수는 코드에 데이터를 가져다 줍니다. 두 인자를 갖는 copy 메서드를 생각해보세요. `copy(src, dest)` src 인자는 복사하기 위한 데이터를 제공합니다. 따라서 "in" 파라미터입니다.

### An "out" Variable

- "out" 변수는 다른 곳에서 사용할 데이터를 가집니다. copy 예에서는 dest 인자가 데이터를 받죠. 따라서 "out"변수 입니다.

물론 몇몇 변수는 in, out 모두를 담당하기도 합니다. 이러한 경우도 가이드라인으로 제공됩니다.

`in`과 `out` 원칙은 어떠한 종류의 wildcard를 사용할지 결정할때 사용할 수 있습니다. 다음이 따라야 할 가이드 라인입니다.

<br>

### Wildcard Guidelines

- `in`변수는 extends 키워드를 사용해서 upper bounded wildcard로 정의
- `out`변수는 super 키워드를 사용해서 lower bounded wildcard로 정의
- Object 클래스에 정의된 메서드를 통해 `in`변수에 접근할 수 있다면 unbounded wildcard 사용
- 코드가 `in` 변수와 `out`변수 모두에 접근해야 하는 경우 wildcard를 사용하지 말 것.

<br>

이 가이드라인은 메서드의 리턴 타입에는 적용되지 않습니다. wildcard를 리턴 타입으로 사용하는것은 피해야 하는데 이러한 것은 프로그래머가 코드를 통해 wildcard를 처리해야 하기 때문입니다.

List&lt;? extends ...&gt;로 정의된 리스트는 비공식적으로는 read-only라고 생각할 수 있지만, 꼭 그렇지만은 않습니다. 다음과 같은 두 클래스가 있다고 가정해보세요.

```java
class NaturalNumber {
    private int i;
    public NaturalNumber(int i) { this.i = i; }
    // ...
}

class EvenNumber extends NaturalNumber {
    
    public EvenNumber(int i) { super(i); }
    // ...
}
```

여기서 다음 두 코드를 보겠습니다.

```java
List<EvenNumber> le = new ArrayList<>();
List<? extends NaturalNumber> ln = le;
ln.add(new NaturalNumber(35));  // compile-time error
```

List&lt;EvenNumber&gt;가 List&lt;? extends NaturalNumber&gt;이기 때문에 le를 ln에 할당할 수 있습니다. 하지만 ln을 통해 짝수 리스트에 자연수를 집어 넣는것은 할 수 없습니다. 다음이 리스트에서 가능한 동작들입니다.

- null을 삽입하는 것
- clear 호출
- iterator의 사용과 remove 호출
- wildcard 캡처와 리스트에서 읽은 항목에 대한 write

보는 바와 같이 List&lt;? extends NaturalNumber&gt;으로 정의된 리스트는 엄격히 말해 read-only가 아닙니다. read-only로 착각할 수 있는것은 리스트에 새로운 값을 삽입하거나 기존의 값을 변경하는 것 등은 불가능하기 때문입니다. 

<br><br>

> #### Reference
>
> - [Oracle : The Java Tutorials - Wildcards](https://docs.oracle.com/javase/tutorial/java/generics/wildcards.html)
> - [Oracle : The Java Tutorials - Upper Bounded Wildcards](https://docs.oracle.com/javase/tutorial/java/generics/upperBounded.html)
> - [Oracle : The Java Tutorials - Unbounded Wildcards](https://docs.oracle.com/javase/tutorial/java/generics/unboundedWildcards.html)
> - [Oracle : The Java Tutorials - Lower Bounded Wildcards](https://docs.oracle.com/javase/tutorial/java/generics/lowerBounded.html)
> - [Oracle : The Java Tutorials - Wildcards and Subtyping](https://docs.oracle.com/javase/tutorial/java/generics/subtyping.html)
> - [Oracle : The Java Tutorials - Wildcard Capture and Helper Methods](https://docs.oracle.com/javase/tutorial/java/generics/capture.html)
> - [Oracle : The Java Tutorials - Guidelines for Wildcard Use](https://docs.oracle.com/javase/tutorial/java/generics/wildcardGuidelines.html)

