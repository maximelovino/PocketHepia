public class ConstantsDemo {
	public static void main (String[] args) {
		String ageInput = "Not a number string";

		//isAdult can't be final
		boolean isAdult = false;

		try{
			final int age = Integer.valueOf(ageInput);
			if (age > 18 && age < 99){
				isAdult = true;
			}
		}catch (NumberFormatException e){
			isAdult = false;
		}

		System.out.println(isAdult);
	}
}
