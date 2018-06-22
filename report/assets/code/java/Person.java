class Person {
	private String firstName;
	private String lastName;
	private int age;

	public Person (String firstName, String lastName, int age) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
	}

	public Person (Person other) {
		this.firstName = other.firstName;
		this.lastName = other.lastName;
		this.age = other.age;
	}


	public String getFirstName () {
		return this.firstName;
	}

	public String getLastName () {
		return this.lastName;
	}

	public int getAge () {
		return this.age;
	}

	@Override
	public boolean equals (Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Person person = (Person) o;
		return age == person.age && firstName.equals(person.firstName) && lastName.equals(person.lastName);
	}

	@Override
	public String toString () {
		return "Person{" +
				"firstName='" + firstName + '\'' +
				", lastName='" + lastName + '\'' +
				", age=" + age +
				'}';
	}
}