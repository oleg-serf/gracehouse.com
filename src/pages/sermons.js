import React, { Component } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Img from "gatsby-image";
import { Helmet } from "react-helmet";
import Youtube from "../img/icon/youtube.inline.svg";
import Spotify from "../img/icon/spotify.inline.svg";
import ApplePodCasts from "../img/icon/apple-podcasts.inline.svg";
import PlaySermon from "../img/icon/play.inline.svg";
import SermonsSlider from "../components/Sermons-Slider";
import OurCommitment from "../components/our-commitment";
import FindUsOn from "../components/find-us-on";
import BackgroundImage from "gatsby-background-image";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import anime from "animejs/lib/anime.es.js";
import AniLink from "gatsby-plugin-transition-link/AniLink";
export default class Sermons extends Component {
  constructor(props) {
    super(props);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  componentDidMount() {
    anime({
      targets: ".sermon-title",
      opacity: 1,
      easing: "cubicBezier(0.115, 0.61, 0.255, 1)",
      duration: 3000,
      top: 0,
      delay: anime.stagger(100, { start: 1000 }),
    });
  }

  render() {
    const { data } = this.props;
    const sermons = data?.allContentfulSermon?.nodes;
    const featured = sermons[0];
    console.log(`${featured?.videoUrl}?autoplay=1&showinfo=0&controls=0 `);
    return (
      <Layout>
        <Helmet>
          <title>Sermons - Gracehouse Church Logan</title>
          <meta
            property="og:title"
            content="Sermons - Gracehouse Church Logan"
          />
          <meta name="description" content="Holiness is a love affair" />
          <meta property="og:description" content="Holiness is a love affair" />
          <meta
            property="og:image"
            // content={data.headerImage2.childImageSharp.fluid.src}
          />
        </Helmet>
        <section className="sermons-header">
          <div className="container sermons-hero">
            <div className="sermons-hero-social">
              <ul>
                <li>
                  <OutboundLink
                    onMouseEnter={this.onHoverLink}
                    onMouseLeave={this.onLeaveLink}
                    target="_blank"
                    href="https://www.youtube.com/channel/UC7ko9KyfJ5PS9eOuhjuWmbQ"
                  >
                    <Youtube />
                    <span>Youtube</span>
                  </OutboundLink>
                </li>
                <li>
                  <OutboundLink
                    target="_blank"
                    onMouseEnter={this.onHoverLink}
                    onMouseLeave={this.onLeaveLink}
                    href="https://www.spotify.com/"
                  >
                    <Spotify />
                    <span>Spotify</span>
                  </OutboundLink>
                </li>
                <li>
                  <OutboundLink
                    target="_blank"
                    onMouseEnter={this.onHoverLink}
                    onMouseLeave={this.onLeaveLink}
                    href="https://apps.apple.com/us/app/apple-podcasts/id525463029"
                  >
                    <ApplePodCasts />
                    <span>Apple podcasts</span>
                  </OutboundLink>
                </li>
              </ul>
            </div>
            <div className="sermons-hero-title">
              <h1>
                Our <span>Sermons</span>
              </h1>
            </div>
          </div>
        </section>

        <section className="sermons-middle-hero">
          <div className="hero-background-wrapper">
            <AniLink fade to={`/sermons/${featured?.slug}`}>
              <iframe
                className="background-video"
                src={`${featured?.videoUrl}?autoplay=1&showinfo=0&controls=0&mute=1 `}
                frameborder="0"
                allowfullscreen="true"
                allow="autoplay; encrypted-media"
              ></iframe>
              <div className="sermon-title container">
                <h2>
                  {featured?.title}
                  <span className="title-orange">
                    {featured?.highlightedTitle}
                  </span>
                </h2>
                <p>{featured.reference}</p>

                <button>
                  <PlaySermon /> <span> Play Sermon</span>
                </button>
              </div>
              {/* </BackgroundImage> */}
            </AniLink>
          </div>
        </section>
        <section>
          <SermonsSlider data={sermons} isSermons />
        </section>
        <section className="container">
          <OurCommitment />
        </section>
        <section>
          <FindUsOn />
        </section>
      </Layout>
    );
  }
}
export const pageQuery = graphql`
  query SermonsQuery {
    site {
      siteMetadata {
        title
      }
    }

    allContentfulSermon(sort: { fields: date, order: DESC }) {
      nodes {
        date
        id
        slug
        title
        highlightedTitle
        reference

        description {
          json
        }
        slug
        videoUrl
      }
    }
  }
`;
