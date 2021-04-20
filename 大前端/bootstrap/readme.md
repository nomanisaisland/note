##     起步

1.  Bootstrap-Table显示数据到表格的方式有两种，一种是客户端（client）模式，一种是服务器（server）模式。

　　+ 客户端模式：指的是在服务器中把要显示到表格的数据一次性加载出来，然后转换成JSON格式传到要显示的界面中，客户端模式较为简单，它是把数据一次性加载出来放到界面上，然后根据你设置的每页记录数，自动生成分页。当点击第二页时，会自动加载出数据，不会再向服务器发送请求。同时用户可以使用其自带的搜索功能，可以实现全数据搜索。对于数据量较少的时候，可以使用这个方法。

　　+ 服务器模式：指的是根据设定的每页记录数和当前要显示的页码，发送数据到服务器进行查询，然后再显示到表格中。该方法可以根据用户的需要动态的加载数据，节省了服务器的资源，但是不能使用其自带的全数据搜索功能。

文件模板：

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Hello, Bootstrap Table!</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.15.3/dist/bootstrap-table.min.css">
  </head>
  <body>
    <table data-toggle="table">
      <thead>
        <tr>
          <th>Item ID</th>
          <th>Item Name</th>
          <th>Item Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Item 1</td>
          <td>$1</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Item 2</td>
          <td>$2</td>
        </tr>
      </tbody>
    </table>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/bootstrap-table@1.15.3/dist/bootstrap-table.min.js"></script>
  </body>
</html>
```

## 下载

```shell
npm install bootstrap-table
```

## 内容

### 数据属性

```html
<table
  data-toggle="table"    <!-- 激活引导表 -->
  data-url="data1.json"
  data-pagination="true"
  data-search="true">
  <thead>
    <tr>
      <th data-sortable="true" data-field="id">Item ID</th>
      <th data-field="name">Item Name</th>
      <th data-field="price">Item Price</th>
    </tr>
  </thead>
</table>
```

### 通过js

```html
<table id="table"></table>

<script>
$('#table').bootstrapTable({
  url: 'data1.json',
  pagination: true,
  search: true,
  columns: [{
    field: 'id',
    title: 'Item ID'
  }, {
    field: 'name',
    title: 'Item Name'
  }, {
    field: 'price',
    title: 'Item Price'
  }]
})
</script>
```



[属性链接](https://www.bootstrap-table.com.cn/doc/api/table-options/)