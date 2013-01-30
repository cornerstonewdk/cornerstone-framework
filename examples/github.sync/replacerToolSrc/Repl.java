import java.io.*;
import java.util.*;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

public class Repl {

  public static String getCodemirrorBlock() {

    String s;
    s =  "<% codeMirrorRequiredBlock = (obj) => %>                                                                          \n";
    s += "<script src='lib/codemirror.js'></script>                                                                         \n";
    s += "<script src='mode/xml/xml.js'></script>                                                                           \n";
    s += "<script src='mode/javascript/javascript.js'></script>                                                             \n";
    s += "<script src='mode/css/css.js'></script>                                                                           \n";
    s += "<script src='mode/htmlmixed/htmlmixed.js'></script>                                                               \n";
    s += "<link rel='stylesheet' href='lib/codemirror.css'></link>                                                          \n";
    s += "<link rel='stylesheet' href='theme/ambiance.css'></link>                                                          \n";
    s += "<style>                                                                                                           \n";
    s += ".CodeMirror { float: left; width: 100%; margin-bottom: 10px; }                                                    \n";
    //s += "iframe { width: 100%; float: left; height: 300px; border: 1px solid black; border-left: 0px; }                    \n";
    s += "iframe { width: 100%; float: left; height: 300px; border: 1px solid black; }                    \n";
    s += "</style>                                                                                                          \n";
    s += "<% end %>                                                                                                         \n";
    s += "<%- codeMirrorRequiredBlock '1' %>                                                                                \n";
    s += "                                                                                                                  \n";
    s += "                                                                                                                  \n";
    s += "                                                                                                                  \n";
    s += "<% codeMirrorBlock = (obj) => %>                                                                                  \n";
    s += "<p>                                                                                                               \n";
    s += "<div class='highlight well' style='padding: 0px 0px 0px 0px;'>                                                    \n";
    s += "<% if obj.if_noscroll: %>                                                                                            \n";
    s += "<iframe id=preview_<%= obj.funcname %> style='<%= obj.ifs_h %><%= obj.ifs_minh %>' scrolling='no'></iframe> \n";
    s += "<% else: %>                                                                                                       \n";
    s += "<iframe id=preview_<%= obj.funcname %> style='<%= obj.ifs_h %><%= obj.ifs_minh %>' ></iframe> \n";
    s += "<% end %>                                                                                                         \n";
    //s += "<p style='margin-bottom:0px;color=white'>-</p>                                                                    \n";
    s += "<textarea id=code_<%= obj.funcname %> name=code_<%= obj.funcname %>>                                              \n";
    s += "<!doctype html>                                                                                                   \n";
    s += "<html>                                                                                                            \n";
    s += "  <head>                                                                                                          \n";
    s += "    <meta charset=utf-8>                                                                                          \n";
    s += "    <link rel='stylesheet' href='./dist/lib/bootstrap/css/bootstrap.css' />                                       \n";
    s += "    <link rel='stylesheet' href='./dist/lib/bootstrap/css/bootstrap-responsive.css' />                            \n";
    s += "    <link rel='stylesheet' href='./dist/ui/theme/dark/css/cornerstone.css' />                                     \n";
    s += "    <link rel='stylesheet' href='./dist/ui/widget-chart.css' />                                                   \n";
    s += "    <link rel='stylesheet' href='./dist/ui/widget-media.css' />                                                   \n";
    s += "    <link rel='stylesheet' href='./dist/ui/widget-scrollview.css' />                                              \n";
    s += "    <link rel='stylesheet' href='./dist/ui/widget-datatable.css' />                                               \n";
    s += "    <link rel='stylesheet' href='./dist/ui/widget-editor.css' />                                                  \n";
    s += "    <link rel='stylesheet' href='./etc.css' />                                                                    \n";
    s += "    <script src='./dist/lib/jquery-1.8.1.min.js'></script>                                                        \n";
    s += "    <script src='./dist/ui/widget-chart.js'></script>                                                             \n";
    s += "    <script src='./dist/ui/widget-datatable.js'></script>                                                         \n";
    s += "    <script src='./dist/ui/widget-editor.js'></script>                                                            \n";
    s += "    <script src='./dist/ui/widget-listview.js'></script>                                                          \n";
    s += "    <script src='./dist/ui/widget-media.js'></script>                                                             \n";
    s += "    <script src='./dist/ui/widget-plugins.js'></script>                                                           \n";
    s += "    <script src='./dist/ui/widget-scrollview.js'></script>                                                        \n";
    s += "  </head>                                                                                                         \n";
    s += "<% if obj.if_nopad: %>                                                                                            \n";
    s += "  <body style='padding-top: 0px;padding-bottom: 0px;padding-left: 0px;padding-right: 0px;'>                   \n";
    s += "<% else: %>                                                                                                       \n";
    s += "  <body style='padding-top: 15px;padding-bottom: 15px;padding-left: 15px;padding-right: 15px;'>                   \n";
    s += "<% end %>                                                                                                         \n";
    s += "    <!--------------------------------------- 예제 코드 시작 --------------------------------------->    \n";
    s += "    <%- obj.func '1' %>                                               \n";
    s += "    <!---------------------------------------- 예제 코드 끝 ---------------------------------------->    \n";
    s += "<% if obj.if_auto_h: %>                                               \n";
    s += "    <script type='text/javascript'>                                   \n";
    s += "      $(function() {                                                  \n";
    s += "        function ifrm_resize (height) {                               \n";
    s += "          var id = 'preview_<%= obj.funcname %>';                     \n";
    s += "          var example1 = window.parent.document.getElementById(id);   \n";
    s += "          $(example1).css( {                                          \n";
    s += "            height: height + 30                                       \n";
    s += "          });                                                         \n";
    s += "        }                                                             \n";
    s += "                                                                      \n";
    s += "        var height = $('body').height();                              \n";
    s += "        ifrm_resize(height);                                          \n";
    s += "                                                                      \n";
    s += "        $(window.parent).on('resize',function() {                     \n";
    s += "          var height = $('body').height();                            \n";
    s += "          ifrm_resize(height);                                        \n";
    s += "        });                                                           \n";
    s += "      });                                                             \n";
    s += "    </script>                                                         \n";
    s += "<% end %>                                                                                                         \n";
    s += "  </body>                                                                                                         \n";
    s += "</html>                                                                                                           \n";
    s += "</textarea>                                                                                                       \n";
    s += "<script>                                                                                                          \n";
    s += "  var delay_<%= obj.funcname %>;                                                                                  \n";
    s += "  var editor_<%= obj.funcname %> = CodeMirror.fromTextArea(document.getElementById('code_<%= obj.funcname %>'), { \n";
    s += "    theme: 'ambiance',                                                                                            \n";
    s += "    lineNumbers: true,                                                                                            \n";
    s += "    mode: 'text/html',                                                                                            \n";
    s += "    tabMode: 'indent',                                                                                            \n";
    s += "    onChange: function() {                                                                                        \n";
    s += "      clearTimeout(delay_<%= obj.funcname %>);                                                                    \n";
    s += "      delay_<%= obj.funcname %> = setTimeout(updatePreview_<%= obj.funcname %>, 300);                             \n";
    s += "    }                                                                                                             \n";
    s += "  });                                                                                                             \n";
    s += "  function updatePreview_<%= obj.funcname %>() {                                                                  \n";
    s += "    var previewFrame = document.getElementById('preview_<%= obj.funcname %>');                                    \n";
    s += "    var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;                          \n";
    s += "    preview.open();                                                                                               \n";
    s += "    preview.write(editor_<%= obj.funcname %>.getValue());                                                         \n";
    s += "    preview.close();                                                                                              \n";
    s += "  }                                                                                                               \n";
    s += "  setTimeout(updatePreview_<%= obj.funcname %>, 300);                                                             \n";
    s += "</script>                                                                                                         \n";
    s += "</div>                                                                                                            \n";
    s += "</p>                                                                                                              \n";
    s += "<% end %>                                                                                                         \n";

    return s;
  }

  public static void convertMD2eco(File mdfile) {

      if ( mdfile.isDirectory() ) {
          // 디렉토리는 변환 대상이 아님.
          return;
      } else if ( !mdfile.getName().endsWith(".md") ) { 
          // 마크다운 파일임을 표시하지 않은 경우 변환하지 않는다.
          return;
      } else {
          //System.err.println( " - Markdown File ! ( "+mdfile.getName()+" )" );
          System.err.println( ": Markdown File Found ! " );
      }

      try {
              BufferedReader in  = new BufferedReader( new FileReader(mdfile) );

              String s;

              s = in.readLine();
              if (s == null) {
                System.err.println("- Input file is blank...");
                in.close();
                return;                 // 빈 파일인 경우 종료
              }

              String outFileName = mdfile.getName().replace(".","_").replace("_md",".html.md.eco").replace(" ","_");
              BufferedWriter out = new BufferedWriter( new FileWriter(outFileName) );

              // 헤더 부분 첫 줄 처리
              if ( s.trim().startsWith("<!--") ) {
                  System.err.println( ": Header Found ! " );
                  out.write("---");
                  out.newLine();
                  // 헤더 나머지 부분 처리
                  while ((s = in.readLine()) != null) {

                      if ( s.trim().startsWith("-->") ) { // 헤더 부분 마지막 줄 처리
                          out.write("---");
                          out.newLine();
                          break;
                      } else if ( s.trim().startsWith("section:") ) { // 메타정보 section 처리
                          out.write(s);
                          out.newLine();

                          String tmp;
                          tmp = s.trim().substring(8); // "section:" 이후 부분만 추출
                          tmp = "sections: ["+tmp.trim()+"]";
                          out.write(tmp);
                          out.newLine();
                      } else if ( s.trim().startsWith("tagstr:") ) { // 메타정보 tagstr 처리
                          out.write(s);
                          out.newLine();

                          String tmp;
                          tmp = s.trim().substring(7); // "tagstr:" 이후 부분만 추출
                          StringTokenizer st = new StringTokenizer(tmp," '‘");
                          tmp = "";
                          for(int i=1; st.hasMoreTokens(); i++) {
                              tmp = tmp + "'" + st.nextToken() + "',";
                          }

                          tmp = "tags: ['post',"+tmp+"'']";
                          out.write(tmp);
                          out.newLine();
                      } else if ( s.trim().startsWith("order:") ) {  // 메타정보 order 처리
                          //s.replace("‘","'");
                          out.write( s.replace("‘","'") );
                          out.newLine();
                      } else if ( s.trim().startsWith("outline:") ) {  // 메타정보 outline 처리
                          out.write( s.replace("<","&lt;").replace(">","&gt;") );
                          out.newLine();
                      } else if ( s.trim().startsWith("title:") ) {  // 메타정보 title 처리
                          out.write( s.replace("<","&lt;").replace(">","&gt;") );
                          out.newLine();
                      } else {
                          out.write(s);
                          out.newLine();
                      }

                  }
              } else {
                System.err.println("- Input file has no header ! Documents must start with <!-- at first line.");
                in.close();
                out.close();
                File f = new File(outFileName);
                f.delete();
                return;
              }

              int preview_cnt=0;
              while ((s = in.readLine()) != null) {
                  if ( s.trim().startsWith("``` cm") || s.trim().startsWith("```cm") ) {  // 코드미러 블럭으로 변환해야 하는 부분 처리
                        System.err.println( ": CodeMirror Block  Found ! " );

                        // 코드미러 관련 설정 값은 JSON 형식임. value 리스트 !
                        /*
                            { 
                                'iframe-height'     : '500px' ,
                                'iframe-min-height' : '200px' , 
                                'iframe-auto-height': true    ,
                                'iframe-no-padding' : true    ,
                                'iframe-no-scrolling' : true 
                            }
                        */
                        // 코드미러 관련 디폴트 설정 값
                        String iframe_height      = "";
                        String iframe_min_height  = "";
                        boolean iframe_auto_height = true;
                        boolean iframe_no_padding = false;
                        boolean iframe_no_scrolling = false;
                        String iframe_scrolling = "no";

                        // 코드미러 관련 설정 내용이 있는지 확인
                        // ```cm 으로 시작되는 라인에서 첫 번째 쉼표(,) 이후 부분을 옵션으로 간주
                        // 쉼표(,) 이후 부분이 필요하므로 s.indexOf()+1 로 한다.
                        // 쉼표(,)가 없는 경우라면 s.indexOf()에서 -1이 리턴되지만 +1 을 하였기 때문에 cm_option에는 s가 그대로 담긴다.
                        String cm_option = s.substring( s.indexOf(",")+1 ).trim();
                        // 코드미러 관련 설정 부분이 맞으면 처리
                        if( cm_option.startsWith("{") && cm_option.endsWith("}") ) {

                            System.err.println( "  CodeMirror Options Found ! " );
                            System.err.println( "  "+cm_option );
                            JSONObject json = new JSONObject();
                            try {
                                json = (JSONObject) JSONSerializer.toJSON( cm_option );
                                System.err.println( "  -> iframe-height     : "+json.get("iframe-height") );
                                System.err.println( "  -> iframe-min-height : "+json.get("iframe-min-height") );
                                System.err.println( "  -> iframe-auto-height: "+json.get("iframe-auto-height") );
                                System.err.println( "  -> iframe-no-padding : "+json.get("iframe-no-padding") );
                                System.err.println( "  -> iframe-no-scrolling : "+json.get("iframe-no-scrolling") );
                                // 코드미러 iframe 높이지정
                                if ( json.get("iframe-height") != null ) {
                                    iframe_height =  (String)json.get("iframe-height");
                                    System.err.println( "  iframe-height     : "+iframe_height );
                                }
                                // 코드미러 iframe MIN높이지정
                                if ( json.get("iframe-min-height") != null ) {
                                    iframe_min_height = (String) json.get("iframe-min-height");
                                    System.err.println( "  iframe-min-height : "+iframe_min_height );
                                }
                                // 코드미러 iframe AUTO높이지정
                                if ( json.get("iframe-auto-height") != null ) {
                                    iframe_auto_height = (boolean) json.get("iframe-auto-height");
                                    System.err.println( "  iframe-auto-height : "+iframe_auto_height );
                                }
                                // 코드미러 iframe 패딩지정
                                if ( json.get("iframe-no-padding") != null ) {
                                    iframe_no_padding = (boolean) json.get("iframe-no-padding");
                                    System.err.println( "  iframe-no-padding : "+iframe_no_padding );
                                }
                                // 코드미러 iframe 스크롤링지정
                                if ( json.get("iframe-no-scrolling") != null ) {
                                    iframe_no_scrolling = (boolean) json.get("iframe-no-scrolling");
                                    System.err.println( "  iframe-no-scrolling : "+iframe_no_scrolling );
                                    if (iframe_no_scrolling)
                                        iframe_scrolling = "no";
                                    else
                                        iframe_scrolling = "yes";
                                    System.err.println( "    - iframe scrolling="+iframe_scrolling );
                                }
                                    
                            } catch (Exception e) {
                                System.err.println(e);
                            }
                        }

                        if (preview_cnt==0) {
                          s = getCodemirrorBlock();
                          //s = s.replaceFirst("CM_IFRAME_HEIGHT",iframe_height);
                          //s = s.replaceFirst("CM_IFRAME_MIN_HEIGHT",iframe_min_height);
                          out.write(s);
                          out.newLine();
                        }

                        preview_cnt++;
                        String funcName = "prv_" + preview_cnt;
                        s = "<% "+funcName+" = (contents) => %>";
                        out.write(s);
                        out.newLine();

                        // 코드미러 블럭 나머지 부분 처리
                        while ((s = in.readLine()) != null) {
                            if (s.trim().length() >= 3) {
                                if ( s.trim().substring(0,3).equals("```")) {
                                    s =  "<% end %><%- codeMirrorBlock {";
                                    s += "func : "      + funcName          + "  , ";
                                    s += "funcname : '" + funcName          + "' , ";

                                    if ( iframe_height.equals("") )
                                        s += "ifs_h : '' , ";
                                    else
                                        s += "ifs_h : 'height: " + iframe_height + ";' , ";

                                    if ( iframe_min_height.equals("") )
                                        s += "ifs_minh : '' , ";
                                    else
                                        s += "ifs_minh : 'min-height: " + iframe_min_height + ";' , ";

                                    s += "if_auto_h : "  + iframe_auto_height + "  , ";
                                    s += "if_nopad : "  + iframe_no_padding + "  , ";
                                    s += "if_noscroll : "  + iframe_no_scrolling + " , ";
                                    s += "no : 'no' ";
                                    s += "} %>";
                                    out.write(s);
                                    out.newLine();
                                    break;
                                } else {
                                    out.write(s);
                                    out.newLine();
                                }
                            } else {
                                out.write(s);
                                out.newLine();
                            }

                        }
                  } else {  // 처리가 필요 없는 라인
                        out.write(s);
                        out.newLine();
                  }
              }
              in.close();
              out.close();
      } catch (IOException e) {
          System.err.println(e); // 에러가 있다면 메시지 출력
          return;
      }
  }

  public static void main(String args[]) {

    if (args.length == 0) {                   // args.length 는 옵션 개수
      System.err.println("Input Directory name...");
      System.exit(1);                         // 읽을 파일명을 주지 않았을 때는 종료
    }
    File md_directory = new File(args[0]);
    File mds[];
    if (md_directory.isDirectory()) {
        mds = md_directory.listFiles();

        for (int i=0; i<mds.length; i++) {
            //System.err.println( "i="+i+" : FileName = "+mds[i].getAbsolutePath() );
            System.err.println( "i="+i+" : "+mds[i].getPath() );
            convertMD2eco(mds[i]);
        }

    } else {
        System.err.println("Not Directory! need directory name...");
        System.exit(1);
    }

  }
}
