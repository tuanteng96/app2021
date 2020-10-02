import React from 'react';
import axios from 'axios';
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Row,
  Col,
  Button
} from 'framework7-react';
import ReactHtmlParser from 'react-html-parser';
import {svg} from "../js/svg";

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Hello Framework7",
      listUser : []
    }
  }
  componentDidMount() {
    this.$f7ready((f7) => {
      // Call F7 APIs here

      axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const data = res.data;
        this.setState({
          listUser: data
        });
      })
      .catch(error => console.log(error));
      
    });
  }

  render () {
    return (
      <Page name="home">
    <h1>{this.state.title}</h1>
    { ReactHtmlParser(svg.home) }
    {/* Top Navbar */}
    <Navbar large sliding={false}>
      <NavLeft>
        <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
      </NavLeft>
      <NavTitle sliding>demo1</NavTitle>
      <NavRight>
        <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="right" />
      </NavRight>
      <NavTitleLarge>demo1</NavTitleLarge>
    </Navbar>
    {/* Toolbar */}
    <Toolbar tabbar bottom>
      <Link tabLink="#tab-1" tabLinkActive>Tab 1</Link>
      <Link tabLink="#tab-2">Tab 2</Link>
      <Link tabLink="#tab-3">Tab 3</Link>
    </Toolbar>
    {/* Page content */}
    
    <BlockTitle>Simple List User</BlockTitle>
    <List>
      {
        this.state.listUser && this.state.listUser.map(user => {
          return (
            <ListItem title={user.name} link={`/user/${user.id}`} key={user.id}></ListItem>
          )
        })
      }
    </List>

    <BlockTitle>Navigation</BlockTitle>
    <List>
      <ListItem link="/about/" title="About"/>
      <ListItem link="/form/" title="Form"/>
    </List>

    <BlockTitle>Modals</BlockTitle>
    <Block strong>
      <Row>
        <Col width="50">
          <Button fill raised popupOpen="#my-popup">Popup</Button>
        </Col>
        <Col width="50">
          <Button fill raised loginScreenOpen="#my-login-screen">Login Screen</Button>
        </Col>
      </Row>
    </Block>

    <BlockTitle>Panels</BlockTitle>
    <Block strong>
      <Row>
        <Col width="50">
          <Button fill raised panelOpen="left">Left Panel</Button>
        </Col>
        <Col width="50">
          <Button fill raised panelOpen="right">Right Panel</Button>
        </Col>
      </Row>
    </Block>

    <List>
      <ListItem
        title="Dynamic (Component) Route"
        link="/dynamic-route/blog/45/post/125/?foo=bar#about"
      />
      <ListItem
        title="Default Route (404)"
        link="/load-something-that-doesnt-exist/"
      />
      <ListItem
        title="Request Data & Load"
        link="/request-and-load/user/123456/"
      />
    </List>
  </Page>
    )
  }
};