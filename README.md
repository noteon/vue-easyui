vue-easyui binding
=============

vue+easyui

## How to use

see ./demo/index.ts

~~~~
npm install
cd demo
bower install
~~~~


add a directive "v-ez-model", two way binding.

~~~~
<input class="easyui-searchbox"  v-ez-model="searchBoxValue"   data-options="prompt:'Please Input Value'" style="width:300px"></input>

<select class="easyui-combogrid" v-ez-model="combogridValue"   style="width:100%" data-options="
    panelWidth: 500,
    idField: 'id',
    textField: 'name',
    data:[
        { id: 1, name:'name1'},
        { id: 2, name:'name2'},
        { id: 3, name:'name3'},
        { id: 4, name:'name4'},
    ],
    method: 'get',
    columns: [[
        {field:'id',title:'Item ID',width:80},
        {field:'name',title:'Product',width:120},
    ]],
    fitColumns: true
">
</select>
~~~~


