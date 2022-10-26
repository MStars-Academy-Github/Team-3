package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);

		System.out.println("Hello world");
		System.out.println("Hello learning from W33");
		System.out.println("Learning from internet Java");
		System.out.println(3 + 3);
		System.out.println(3 * 3);
		DemoApplication myCar = new DemoApplication();
		myCar.fullThrottle();
		// it's a single line comment
		/*
		 * It's multi-line comment comment
		 * HI from second line
		 */
		String name = "Bayna";
		String lastname = "Purevjargal";
		Integer numbers = 15;
		System.out.println(name + " " + lastname);
		System.out.println(numbers);
		int x = 5, y = 6, z = 50;
		System.out.println(x + y + z);
		float myFloutNumber = 3.14f;
		System.out.println(myFloutNumber);
		byte myNum = 127;
		boolean isJavaFun = true;
		System.out.println(isJavaFun);
		double myDouble = 9.78d;
		int myInt = (int) myDouble;
		System.out.println(myInt);
		System.out.println(x < y);
		System.out.println("The length of text string is:" + lastname.length());
		System.out.println(lastname.toUpperCase());
		String txt = "Please locate a where is 'locate' appear";
		System.out.println(txt.indexOf("locate"));
		System.out.println(name.concat(lastname));
		String testtext = "It\'s alrigth.";
		System.out.println(testtext);
		System.out.println((int) Math.sqrt(64));
		String result = (x == y) ? "Good day" : "Good evening";
		System.out.println(result);
		int day = 1;

		switch (day) {
			case 1:
				System.out.println("Today is Monday");
				break;
			default:
				System.out.println("Not have decent answer of week");
		}

		for (int i = 1; i <= 5; i++) {
			System.out.println(i);
		}
		String[] cars = { "BMW", "Ford", "Mazda" };
		System.out.println(cars);
		for (String i : cars) {
			System.out.println(i);
		}
		myMethod();
		myMethod();
		methodParametr("Bayanjargal");
		System.out.println(plusMethod(10, 20));
		int myNum1 = plusMethod(46, 1545);
		int resultOfrecur = sum(5, 10);
		System.out.println(resultOfrecur);
		System.out.println(myNum1);

	}

	static void myMethod() {
		System.out.println("i just got executed");
	}

	static void methodParametr(String fname) {
		System.out.println(fname);
	}

	static int plusMethod(int x, int y) {
		return x + y;
	}

	static int sum(int start, int end) {
		if (end > start) {
			return end + sum(start, end - 1);
		} else {
			return end;
		}
	}

	static void fullThrottle() {
		System.out.println("The car is ");
	}
}
