---
title: Apache Spark
date: "2020-04-18T22:12:03.284Z"
description: "Apache Spark 소개, Spark이란?"
thumbnail: "./logo.png"
tags: ["spark", "big data"]
---

<p align="center"><img src="./logo.png" style="width:40vw"/></p>



<br>

<br>

# MapReduce를 보완한 새로운 분산 처리 기술 : Spark

<br>

## Spark 이란?

Spark의 탄생 이전에는 대용량 데이터 처리 = Hadoop의 MapReduce 였습니다. 하지만 디스크 기반의 수행으로 느린 성능을 개선하기 위해 지속적인 노력끝에 지쳐서 다른 대안을 찾게된 MR 단점 개선 프로젝트의 결과물이 `Spark`입니다. Spark은 메모리 기반으로 수행됩니다. [Apache Spark](https://spark.apache.org/)  공식문서에 따르면 기존의 MapReduce 기반 Hadoop보다  Spark은 100배 이상 빠른 속도가 지원된다고 말합니다. 빠른 성능과 쉬운 사용법 등으로 인해 현재 데이터 처리의 모든 영역은 Spark이 점령했다고 해도 과언이 아닙니다.

<br>

Spark은 대용량 데이터처리를 위한 오픈소스 병렬분산처리 플랫폼입니다.

Spark의 공식적인 정의는 다음과 같습니다.

*Apache Spark is a unified analytics engine for large-scale data processing*

여기서 조금 더 사용성에 있어 의역을 해보면 *for large scale*은 대용량보다 **데이터의 크기에 상관 없이**, *unified analytics engine* 은 **종합 선물세트** 같은 느낌으로 봐도 됩니다.

쉽게 말하자면 Spark은 데이터를 처리할 일이 있을때 사용하면 매우 빠르고 편리하고 안정적인 도구입니다.

<br>

## Spark의 특징

1. Spark은 별도의 앱 없이 내장하고 있는 shell를 통해 쿼리 수행이 가능합니다.
2. 하지만 어플리케이션을 **Scala**, **Python**, **Java**, **R** 에 대한 API도 제공합니다.
3. 설치와 진행이 매우 간편합니다. Hadoop에 의존하고 있지만 Hadoop을 설치할 필요도, 내장된 shell을 이용하기 위해서는 해당 언어가 설치되어 있지 않더라도 문제가 없습니다.
4. Spark은 데이터 중심이며 선언형 프로그래밍입니다.
5. Lazy evaluation을 통해 optimization이 가능합니다.
6. RDD, DataFrame 등을 통해 비즈니스 로직 구현에 집중할 수 있는 환경제공합니다.
7. 그 밖에 메모리 기반이다 / shell을 통한 interpreter이다 / source 코드 관리가 가능하며 unittest 가 가능하다고 IDE 디버깅이 가능하다 등의 특징점들이 있습니다.

<br>

## Spark 기능

Spark에는 크게 다음과 같은 기능들이 있습니다.

- 맵리듀스와 유사한 일괄 처리 기능
- 실시간 데이터 처리 기능 (*Spark Streaming*)
- SQL과 유사한 정형 데이터 처리 기능 (*Spark SQL*)
- 그래프 알고리즘 (*Spark GraphX*)
- 머신 러닝 알고리즘 (*Spark MLlib*)

<br>

## Spark 스택 구조

Spark이 동작하기 위한 전반적인 스택 구조는 다음과 같습니다.

<br>

<img src="./stack_structure.png" style="width:70vw"/>

<br>

### 인프라 계층

Spark이 기동되기 위한 인프라로 자원 분배를 위한 Cluster Manager의 자리입니다.

Spark은 독립적으로 기동할수 있도록 Spark 패키지에 Standalone이라는 클러스터 매니저가 포함되어 있습니다.

이 자리는 Docker 가상화 플랫폼인 Mesos 혹은 Hadoop 종합 플랫폼인 YARN이 올 수도 있습니다.

### 스파크 코어

메모리 기반의 분산 클러스터 컴퓨팅 환경인 Spark 코어가 그 위에 올라갑니다.

### 스파크 라이브러리

Spark 코어를 이용하여 특정 기능에 목적이 맞춰진 다양한 라이브러리가 돌아갑니다. 라이브러리는 위의 Spark의 기능에서 설명한 SparkSQL, Spark Streaming, MLib, GraphX 등이 있습니다.

<br>

## Spark tutorial - Word Count

일반적으로 무언가 처음보는 기술을 접할때 Hello World 출력부터 시작합니다.

이런 첫 예제의 특징은 가장 간단하고, 가장 기본적이고 자주 활용되는 문법이며, 프로그램 및 관련 개발 런타임 환경 테스트가 목적입니다.

Spark에서의 Hello World!가 바로 [word count](https://spark.apache.org/examples.html) 예제입니다.

단어를 세는 이유는 다음과 같습니다. 

1. 전형적인 입력데이터(파일 입출력)이 주어집니다.
2. 컨텐츠, 저장형식, 크기를 조절할 수 있습니다.
3. 읽고 처리하고, 결과를 전달한다는, data process 의 가장 근본적인 프로세스가 진행됩니다.

여기서 해당 예제는 직접 진행하지 않습니다. 공식문서를 기반으로 간단하게 따라해보는 것으로 충분합니다. 해당 부분에 대해서는 공식문서의 내용을 딱히 내용을 자세히 읽을 필요도 없습니다. 복붙만 해보고 이런거다 느끼면 해당 튜토리얼의 의의는 충분하다고 생각합니다. 

<br><br>

> #### Reference
>
> - [[SPARK] 아파치 스파크란?](https://12bme.tistory.com/433)
> - [NaverShare-처음시작하는Spark](https://share.navercorp.com/techshare191018/joinLectures/26040)
> - [조대협의 블로그](https://bcho.tistory.com/1026?category=563141)