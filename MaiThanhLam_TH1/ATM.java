import java.util.Scanner;

public class ATM {
    public static void main(String[] args) throws Exception {
        View.view();
    }
}

class Model {
    private int accountNo;
    private String password;
    private double amount;
    private String customerName;

    public Model(int accNo, String pass, double amount, String name) {
        this.accountNo = accNo;
        this.password = pass;
        this.amount = amount;
        this.customerName = name;
    }

    public void setAccountNo(int accNo) {
        this.accountNo = accNo;
    }

    public int getAccountNo() {
        return this.accountNo;
    }

    public void setPassword(String pass) {
        this.password = pass;
    }

    public String getPassword() {
        return this.password;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public double getAmount() {
        return this.amount;
    }

    public void setCustomerName(String custName) {
        this.customerName = custName;
    }
    
    public String getCustomerName() {
        return this.customerName;
    }

    public boolean checkLogin(int accNo, String pass) {
        return accNo == this.accountNo && pass.equals(this.password);
    }

    public boolean withdraw(double amount) { 
        if (amount < this.amount) {
            this.amount -= amount;
            return true;
        } else
            return false;
    }

    public boolean depost(double amount) {
        if (amount > 0) {
            this.amount += amount;
            return true;
        } else
            return false;
    }
}

class View {
    public static void view() {
        System.out.println("Welcome to ATM Application");
        Scanner sc = new Scanner(System.in);
        Model acc1 = new Model(1, "abc123", 10000000, "Mai Thanh Lam");

        String choice = "y";
        while (choice.equalsIgnoreCase("y")) {
            System.out.println("1 - Login");
            System.out.println("2 - View Account information");
            System.out.println("3 - Withdraw");
            System.out.println("4 - Transfer");

            System.out.print("Select your action: ");
            int action = sc.nextInt();

            switch (action) {
                case 1:
                    if (Controller.login(acc1)) {
                        System.out.println("Login success!");
                    } else {
                        System.out.println("Login fail!");
                    }
                    break;

                case 2:
                    Controller.viewAccount(acc1);
                    break;

                case 3:
                    if (Controller.withdraw(acc1)) {
                        System.out.println("Withdraw success!");
                    } else {
                        System.out.println("Login Fail1!");
                    }
                    break;

                case 4:
                    Model acc2 = new Model(2, "cde456", 700000, "Le Quang Hung");
                    if (Controller.transfer(acc1, acc2)) {
                        System.out.println("Transfer success!");
                    } else {
                        System.out.println("Transfer fail!");
                    }
                    break;

                default:
                    System.out.println("Invalid operation!");
                    break;
            }
            System.err.println("========");
            System.out.print("Continue? (Y/N): ");
            choice = sc.next();

            System.out.println();
        }
    }
}

class Controller {
    public static boolean transfer(Model acc1, Model acc2) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Please enter your amount to transfer: ");
        double amount = sc.nextDouble();
        return acc1.withdraw(amount) && acc2.depost(amount);
    }

    public static void viewAccount(Model acc) {
        System.out.println("Account Number: " + acc.getAccountNo());
        System.out.println("Account Name: " + acc.getCustomerName());
        System.out.println("Amount: " + acc.getAmount());
    }

    public static boolean withdraw(Model acc) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Please enter your amount to withdraw: ");
        double amount = sc.nextDouble();
        return acc.withdraw(amount);
    }

    public static boolean login(Model acc) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter your account number: ");
        int accNo = sc.nextInt();
        System.out.print("Enter your password: ");
        String pass = sc.next();
        return acc.checkLogin(accNo, pass);
    }
}
