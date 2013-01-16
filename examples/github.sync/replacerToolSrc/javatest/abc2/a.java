import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

public class a {

    public static void aone () {
        System.out.println("- aone");

    }

    public static void main (String[] args) {
        System.out.println("MAIN Start");
        aone();
        b.bone();

        /*
        // json-lib-2.3-jdk15.jar
        //
        // JSONObject 객체 생성할 때 위의 라이브러리 이외에 다음과 apache 라이브러리가 추가로 필요
        // commons-lang-2.6.jar
        // commons-logging-1.1.1.jar
        // commons-collections-3.2.1.jar
        //
        // 다음의 라이브러리도 필요
        // ezmorph-1.0.6.jar
        */
        JSONObject json = new JSONObject();
        String jsonTxt = "{\"age\":\"20\",\"name\":\"pondol\",\"gender\":\"man\",\"TOF\":true}";
        System.out.println(jsonTxt);

        /*
        // json 텍스트 json 객체로 변환하기 위해서 다음 라이브러리 필요
        // commons-beanutils-1.8.3.jar
        */
        try {
            json = (JSONObject) JSONSerializer.toJSON(jsonTxt);
        } catch (Exception e) {
            System.out.println(e);
        }
        System.out.println(json);
        System.out.println(json.get("age"));
        System.out.println(json.get("TOF"));

        System.out.println("MAIN End  ");
    }
}

