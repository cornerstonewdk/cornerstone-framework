
import com.google.gson.Gson;

public class a {

    public static void aone () {
        System.out.println("- aone");

    }

    public static void main (String[] args) {
        System.out.println("MAIN Start");
        aone();
        b.bone();

        Gson gson = new Gson();
        String json="{\"value1\":1,\"value2\":\"abc\"}";
        System.out.println("   json is : "+json);
        /*
        JSONConverter obj = gson.fromJson(json, JSONConverter.class);
        System.out.println("   json object is : "+obj.toString() );
        */

        System.out.println("MAIN End  ");
    }
}

