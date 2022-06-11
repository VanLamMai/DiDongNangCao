import java.util.Scanner;

public class Hello{
    public static void main(String[] args) throws Exception {
        String name, gender;
        int age, phone;


        Scanner ip = new Scanner(System.in);
        try{
        System.out.println("Hay nhap thong tin cua ban: ");
        System.out.print("Nhap ten cua ban: ");
        name = ip.nextLine();
        System.out.print("Nhap gioi tinh cua ban: ");
        gender = ip.nextLine();
        System.out.print("Nhap tuoi cua ban: ");
        age = ip.nextInt();
        System.out.print("Nhap so dien thoai cua ban: ");
        phone = ip.nextInt();
        
        System.out.println("Thong tin cua ban gom: ");
        System.out.println("Ten cua ban la: " + name);
        System.out.println("Tuoi cua ban la: " + age);
        System.out.println("So dien thoai cua ban la: " + phone);
        System.out.println("Gioi tinh cua ban la: " + gender);
        System.out.println("Xin cam on" + name + "va hen gap lai");
        }finally{
            ip.close();
        }
        
    }
}
