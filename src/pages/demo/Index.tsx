import React, {Component} from "react";
import {PageHeaderWrapper} from '@ant-design/pro-layout'
import {Card, Divider, Tag,Table} from 'antd'
import {connect} from 'dva'

const namespace = 'demo'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
      {tags.map(tag => {
        let color = tag.length > 5 ? 'geekblue' : 'green';
        if (tag === 'loser') {
          color = 'volcano';
        }
        return (
          <Tag color={color} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        );
      })}
    </span>
    )
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
      <a>
        Invite {record.name}
      </a>
      <Divider type="vertical"/>
      <a>Delete</a>
    </span>
    )
  }

]

@connect(({demo}) => ({
    data: demo.list
}))
export default class Index extends Component{
  componentDidMount() {
    const {dispatch} = this.props
    dispatch({
      type:`${namespace}/initData`

    })
  }

  render() {
    return (
      <PageHeaderWrapper>
        <Card>
          <Table columns={columns} dataSource={this.props.data}/>
        </Card>
      </PageHeaderWrapper>
    );
  }
}



