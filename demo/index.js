
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Button from 'bee-button';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';


const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var Demo23 = require("./demolist/Demo23");var DemoArray = [{"example":<Demo1 />,"title":" 简单表格、文字过长，两种tip","code":"/**\n*\n* @title 简单表格、文字过长，两种tip\n* 【Tooltip】\n* @description\n*/\n\nimport React, { Component } from \"react\";\nimport { Table, Tooltip, Button } from 'tinper-bee';\n\nconst columns = [\n  {\n    title: \"用户名\", dataIndex: \"a\", key: \"a\", width: 80, className: \"rowClassName\",\n    render: (text, record, index) => {\n      return (\n        <Tooltip inverse overlay={text}>\n          <span tootip={text} style={{\n            display: \"inline-block\",\n            width: \"60px\",\n            textOverflow: \"ellipsis\",\n            overflow: \"hidden\",\n            whiteSpace: \"nowrap\",\n            verticalAlign: \"middle\",\n          }}>{text}</span>\n        </Tooltip>\n      );\n    }\n  },\n  { id: \"123\", title: \"性别\", dataIndex: \"b\", key: \"b\", width: '10%' },\n  { title: \"年龄\", dataIndex: \"c\", key: \"c\", width: 200 },\n  {\n    title: \"操作\",\n    dataIndex: \"d\",\n    key: \"d\",\n    render(text, record, index) {\n      return (\n        <div style={{ position: 'relative' }} title={text} >\n          <a\n            href=\"javascript:;\"\n            tooltip={text}\n            onClick={() => {\n              alert('这是第' + index + '列，内容为:' + text);\n            }}\n          >\n            一些操作\n              </a>\n        </div>\n      );\n    }\n  }\n];\n\nconst data = [\n  { a: \"令狐冲\", b: \"男\", c: 41, d: \"操作\", key: \"1\" },\n  { a: \"杨过叔叔的女儿黄蓉\", b: \"男\", c: 67, d: \"操作\", key: \"2\" },\n  { a: \"郭靖\", b: \"男\", c: 25, d: \"操作\", key: \"3\" }\n];\n\nclass Demo1 extends Component {\n\n  constructor(props) {\n    super(props);\n    this.state = {\n      data: data,\n      selectedRowIndex: 0\n    }\n  }\n\n  render() {\n    return (\n   \n        <Table\n          columns={columns}\n          data={data}\n          parentNodeId='parent'\n          height={43}\n          headerHeight={42}\n          onRowClick={(record, index, indent) => {\n            this.setState({\n              selectedRowIndex: index\n            });\n          }}\n        />\n\n     \n    );\n  }\n}\n\n\n","desc":""},{"example":<Demo2 />,"title":" 增删改表格","code":"/**\n*\n* @title 增删改表格\n* @description 这是带有增删改功能的表格（此编辑功能未使用render组件）\n*\n*/\n\nimport React, { Component } from \"react\";\nimport { Table, Popconfirm, Input, Icon, Animate, Button } from 'tinper-bee';\n\nclass EditableCell extends React.Component {\n  state = {\n    value: this.props.value,\n    editable: false\n  };\n  handleChange = e => {\n    const value = e;\n    this.setState({ value });\n  };\n  check = () => {\n    this.setState({ editable: false });\n    if (this.props.onChange) {\n      this.props.onChange(this.state.value);\n    }\n  };\n  edit = () => {\n    this.setState({ editable: true });\n  };\n  handleKeydown = event => {\n    if (event.keyCode == 13) {\n      this.check();\n    }\n  };\n  render() {\n    const { value, editable } = this.state;\n    return (\n      <div className=\"editable-cell\">\n        {editable ? (\n          <div className=\"editable-cell-input-wrapper\">\n            <Input\n              value={value}\n              onChange={this.handleChange}\n              onKeyDown={this.handleKeydown}\n            />\n            <Icon\n              type=\"uf-correct\"\n              className=\"editable-cell-icon-check\"\n              onClick={this.check}\n            />\n          </div>\n        ) : (\n          <div className=\"editable-cell-text-wrapper\">\n            {value || \" \"}\n            <Icon\n              type=\"uf-pencil\"\n              className=\"editable-cell-icon\"\n              onClick={this.edit}\n            />\n          </div>\n        )}\n      </div>\n    );\n  }\n}\n\nclass Demo2 extends React.Component {\n  constructor(props) {\n    super(props);\n    this.columns = [\n      {\n        title: \"姓名\",\n        dataIndex: \"name\",\n        key: \"name\",\n        width: \"30%\",\n        render: (text, record, index) => (\n          <EditableCell\n            value={text}\n            onChange={this.onCellChange(index, \"name\")}\n          />\n        )\n      },\n      {\n        title: \"年龄\",\n        dataIndex: \"age\",\n        key: \"age\"\n      },\n      {\n        title: \"你懂的\",\n        dataIndex: \"address\",\n        key: \"address\"\n      },\n      {\n        title: \"操作\",\n        dataIndex: \"operation\",\n        key: \"operation\",\n        render: (text, record, index) => {\n          return this.state.dataSource.length > 1 ? (\n            <Popconfirm content=\"确认删除?\" id=\"aa\" onClose={this.onDelete(index)}>\n              <Icon type=\"uf-del\" />\n            </Popconfirm>\n          ) : null;\n        }\n      }\n    ];\n\n    this.state = {\n      dataSource: [\n        {\n          key: \"0\",\n          name: \"沉鱼\",\n          age: \"18\",\n          address: \"96, 77, 89\"\n        },\n        {\n          key: \"1\",\n          name: \"落雁\",\n          age: \"16\",\n          address: \"90, 70, 80\"\n        },\n        {\n          key: \"2\",\n          name: \"闭月\",\n          age: \"17\",\n          address: \"80, 60, 80\"\n        },\n        {\n          key: \"3\",\n          name: \"羞花\",\n          age: \"20\",\n          address: \"120, 60, 90\"\n        }\n      ],\n      count: 4\n    };\n  }\n  onCellChange = (index, key) => {\n    return value => {\n      const dataSource = [...this.state.dataSource];\n      dataSource[index][key] = value;\n      this.setState({ dataSource });\n    };\n  };\n  onDelete = (index) => {\n    return () => {\n      const dataSource = [...this.state.dataSource];\n      dataSource.splice(index, 1);\n      this.setState({ dataSource });\n    }\n  };\n  handleAdd = () => {\n    const { count, dataSource } = this.state;\n    const newData = {\n      key: count,\n      name: `凤姐 ${count}`,\n      age: 32,\n      address: `100 100 100`\n    };\n    this.setState({\n      dataSource: [...dataSource, newData],\n      count: count + 1\n    });\n  };\n\n  getBodyWrapper = body => {\n    return (\n      <Animate\n        transitionName=\"move\"\n        component=\"tbody\"\n        className={body.props.className}\n      >\n        {body.props.children}\n      </Animate>\n    );\n  };\n  render() {\n    const { dataSource } = this.state;\n    const columns = this.columns;\n    return (\n      <div>\n        <Button\n          className=\"editable-add-btn\"\n          type=\"ghost\"\n          onClick={this.handleAdd}\n        >\n          添加\n        </Button>\n        <Table\n          data={dataSource}\n          columns={columns}\n          scroll={{x:1800,y:100}}\n          getBodyWrapper={this.getBodyWrapper}\n        />\n      </div>\n    );\n  }\n}\n\n\n","desc":" 这是带有增删改功能的表格（此编辑功能未使用render组件）"},{"example":<Demo23 />,"title":" 拖拽调整列的宽度","code":"/**\n*\n* @title 拖拽调整列的宽度\n* @description 注：不支持tree结构的表头、合并表头的table【目前支持表头拖拽宽度、交互列一起使用】\n*/\nimport React, { Component } from 'react';\nimport { Table, Icon } from 'tinper-bee'; \nimport dragColumn from \"tinper-bee/lib/dragColumn\";;\n\n\nconst columns23 = [\n  {\n    title: \"名字\",\n    dataIndex: \"a\",\n    key: \"a\",\n    width: '200'\n  },\n  {\n    title: \"性别\",\n    dataIndex: \"b\",\n    key: \"b\",\n    width: '100'\n  },\n  {\n    title: \"年龄\",\n    dataIndex: \"c\",\n    key: \"c\",\n    width: '200',\n    sumCol: true,\n    sorter: (a, b) => a.c - b.c\n  },\n  {\n    title: \"武功级别\",\n    dataIndex: \"d\",\n    key: \"d\",\n    fixed:'right',\n    width: 200,\n  }\n];\n\nconst data23 = [\n  { a: \"杨过\", b: \"男\", c: 30,d:'内行', key: \"2\" },\n  { a: \"令狐冲\", b: \"男\", c: 41,d:'大侠', key: \"1\" },\n  { a: \"郭靖\", b: \"男\", c: 25,d:'大侠', key: \"3\" }\n];\n\nconst DragColumnTable = dragColumn(Table);\n\nconst defaultProps23 = {\n  prefixCls: \"bee-table\"\n};\n\nclass Demo23 extends Component {\n  constructor(props) {\n    super(props); \n  }\n\n  render() {\n    return <DragColumnTable columns={columns23} data={data23} bordered\n    dragborder={true} \n    draggable={true} \n    \n    onDropBorder ={(e,width)=>{\n      console.log(width+\"--调整列宽后触发事件\",e.target);\n    }}\n    />;\n  }\n}\nDemo23.defaultProps = defaultProps23;\n\n\n","desc":" 注：不支持tree结构的表头、合并表头的table【目前支持表头拖拽宽度、交互列一起使用】"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ open: !this.state.open })
    }

    render () {
        const { title, example, code, desc, scss_code  } = this.props;
        let caret = this.state.open ? CARETUP : CARET;
        let text = this.state.open ? "隐藏代码" : "查看代码";

        const header = (
            <div>
                {example}
                <Button style={{"marginTop": "10px"}} shape="block" onClick={ this.handleClick }>
                    { caret }
                    { text }
                </Button>
            </div>
        );
        return (
            <Col md={12} >
                <h3>{ title }</h3>
                <p>{ desc }</p>
                <Panel copyable collapsible headerContent expanded={ this.state.open } colors='bordered' header={ header } footerStyle = {{padding: 0}}>
                    <pre><code className="hljs javascript">{ code }</code></pre>
                    { !!scss_code ? <pre><code className="hljs css">{ scss_code }</code></pre> : null }
                </Panel>
            </Col>
        )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
                <Row>
                    {DemoArray.map((child,index) => {

                        return (
                            <Demo example= {child.example} title= {child.title} code= {child.code} scss_code= {child.scss_code} desc= {child.desc} key= {index}/>
                        )

                    })}
                </Row>
        )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
