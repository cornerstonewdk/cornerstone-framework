피처드
----------

json data 검증 : [http://jsonlint.com/](http://jsonlint.com/)

json editor : [http://jsoneditor.net/](http://jsoneditor.net/)

### ScrollView
스크롤뷰 사용 방법

### List View
리스트뷰 사용 방법

### 미디어
미디어 사용 방법

### 에디터
에디터 사용 방법

### Datatables
데이터테이블 사용 방법

Introduction
DataTables operates on the principle of progressive enhancement, whereby an enhanced and interactive table will be presented to the end user if their browser has the required capabilities. When you initialise the jQuery.dataTable object, information about the table is read directly from the HTML page. In combination with the default values for the features in DataTables, this makes it very easy to integrate directly into your web-site or web-application. Optionally, you can use the initialisation parameters to load data from locations other than the DOM, such as a server-side processing script or an Ajax obtained JSON file.

Prerequisites
In order for DataTables to be able to function correctly, the HTML for the target table must be laid out in a well formed manner with the 'thead' and 'tbody' sections declared. For example:

<table id="table_id">
    <thead>
        <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>etc</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Row 1 Data 1</td>
            <td>Row 1 Data 2</td>
            <td>etc</td>
        </tr>
        <tr>
            <td>Row 2 Data 1</td>
            <td>Row 2 Data 2</td>
            <td>etc</td>
        </tr>
    </tbody>
</table>
Defining the 'tfoot' section is optional from the view point of DataTables, and if defined will be used in a similar manner to how thead is used, with the exception of not being able to use it to sort data.

Data sources
DataTables can take the data that it is to display from a number of different sources. This means that you are not limited to giving DataTables what it needs in one specific way, providing a great deal of flexibility. There are four core methods of giving data to DataTables:

DOM (i.e. an HTML table in a page)
JavaScript array
Ajax source - a server-side file, with JSON formatting
Server-side processing - where the server will deal with pagination, filtering etc
DOM - At the basic level, you can give DataTables a reference to a table which already exists in your HTML page and it will enhance it for you. DataTables will read all of the information about the table from the page (the DOM) and add features such as filtering, paging and sorting. This follows the basis for progressive enhancement where a table will be enhanced if JavaScript is available, and not if the browser doesn't have the required capabilities.

JavaScript array - This provides the ability to give DataTables the information that you wish to display in the table as a JavaScript 2D array (i.e. an array of arrays). This is useful when your data in computed by JavaScript, or when adding a table to a page dynamically. It can also be used along side progressive enhancement to present the full table when JavaScript is enabled, but the HTML table would only show the first "page".

Ajax source - When the data you wish to display is available from a server and is not yet in the browser, you can ask DataTables to go to the server and pull the data back from it for display. A common use case for this is when you are displaying live information which could be periodically updated. Although the basic format that DataTables requires is fixed (an object with a 2D array called "aaData") you can use fnServerData to customise the Ajax call that DataTables makes, and also post-process data from one format to that which DataTables expects.

### Chart
차트 사용 방법
