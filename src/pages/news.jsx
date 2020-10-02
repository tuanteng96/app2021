import React from 'react';
import {
  Page,
  ListItem,
  Toolbar,
  Link,
  Navbar,
  NavRight,
  NavLeft,
  NavTitle
} from 'framework7-react';
import ReactHtmlParser from 'react-html-parser';
import {svg} from "../js/svg";
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { Swiper, SwiperSlide } from 'swiper/react';
import NewsDataService from '../service/news.service';
import 'swiper/swiper.scss';
import Nav from '../components/nav/Nav';
import NavBar from '../components/navBar/navBar';

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            arrNews: [],
        }
      }
      componentDidMount() {
        this.$f7ready((f7) => {
          // Call F7 APIs here
          NewsDataService.getBanner()
            .then(response => {
                const arrNews = response.data.data;
                this.setState({
                    arrNews: arrNews
                })
            })
            .catch(e => {
                console.log(e);
            });
            
        });
      }

      render () {
        const arrNews = this.state.arrNews;
        return (
          <Page name="news">
            <div className="page-custom ezs-nav ezs-navbar">
                <NavBar />
                <div className="page-render">
                  <div className="blocks"><p>Tab 1 content</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium voluptates obcaecati officia cum, sit libero commodi. Ratione illo suscipit temporibus sequi iure ad laboriosam accusamus?</p><p class="">Saepe explicabo voluptas ducimus provident, doloremque quo totam molestias! Suscipit blanditiis eaque exercitationem praesentium reprehenderit, fuga accusamus possimus sed, sint facilis ratione quod, qui dignissimos voluptas! Aliquam rerum consequuntur deleniti.</p><p>Totam reprehenderit amet commodi ipsum nam provident doloremque possimus odio itaque, est animi culpa modi consequatur reiciendis corporis libero laudantium sed eveniet unde delectus a maiores nihil dolores? Natus, perferendis.</p><p>Atque quis totam repellendus omnis alias magnam corrupti, possimus aspernatur perspiciatis quae provident consequatur minima doloremque blanditiis nihil maxime ducimus earum autem. Magni animi blanditiis similique iusto, repellat sed quisquam!</p><p>Suscipit, facere quasi atque totam. Repudiandae facilis at optio atque, rem nam, natus ratione cum enim voluptatem suscipit veniam! Repellat, est debitis. Modi nam mollitia explicabo, unde aliquid impedit! Adipisci!</p><p>Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae consectetur iste fugiat iusto dolorem autem. Itaque, ipsa voluptas, a assumenda rem, dolorum porro accusantium, officiis veniam nostrum cum cumque impedit.</p><p>Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur rem, natus ad praesentium rerum libero consectetur temporibus cupiditate atque aspernatur, eaque provident eligendi quaerat ea soluta doloremque. Iure fugit, minima facere.</p></div>
                      {/* <Swiper
                          spaceBetween={50}
                          slidesPerView={1}
                          >
                              { arrNews && arrNews.map((item,index) => 
                                  {
                                      if(index >= 2) return null;
                                      return (
                                          <SwiperSlide key={item.ID}>{item.Title}</SwiperSlide>
                                      )
                                  }
                              )}
                          
                      </Swiper> */}
                </div>
                <Nav 
                    itemNumber="4"
                    itemIcon="true"
                    itemPosition="bottom"
                    itemActive="news"
                />
            </div>
          </Page>
        )
      }
}