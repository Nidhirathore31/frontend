import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'

const contact = () => {
  return (
    <>
  <Header/>
  <div className="page-heading contact-heading header-text">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="text-content">
            <h4>contact us</h4>
            <h2>let’s get in touch</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="find-us">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="section-heading">
            <h2>Our Location on Maps</h2>
          </div>
        </div>
        <div className="col-md-8">
          {/* How to change your own map point
	1. Go to Google Maps
	2. Click on your location point
	3. Click "Share" and choose "Embed map" tab
	4. Copy only URL and paste it within the src="" field below
*/}
          <div id="map">
            <iframe
              src="https://maps.google.com/maps?q=Av.+L%C3%BAcio+Costa,+Rio+de+Janeiro+-+RJ,+Brazil&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="330px"
              frameBorder={0}
              style={{ border: 0 }}
              allowFullScreen=""
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="left-content">
            <h4>About our office</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisic elit. Sed
              voluptate nihil eumester consectetur similiqu consectetur.
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipisic elit. Et,
              consequuntur, modi mollitia corporis ipsa voluptate corrupti.
            </p>
            <ul className="social-icons">
              <li>
                <a href="#">
                  <i className="fa fa-facebook" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-linkedin" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-behance" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="send-message">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="section-heading">
            <h2>Send us a Message</h2>
          </div>
        </div>
        <div className="col-md-8">
          <div className="contact-form">
            <form id="contact" action="" method="post">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <fieldset>
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Full Name"
                      required=""
                    />
                  </fieldset>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <fieldset>
                    <input
                      name="email"
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="E-Mail Address"
                      required=""
                    />
                  </fieldset>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <fieldset>
                    <input
                      name="subject"
                      type="text"
                      className="form-control"
                      id="subject"
                      placeholder="Subject"
                      required=""
                    />
                  </fieldset>
                </div>
                <div className="col-lg-12">
                  <fieldset>
                    <textarea
                      name="message"
                      rows={6}
                      className="form-control"
                      id="message"
                      placeholder="Your Message"
                      required=""
                      defaultValue={""}
                    />
                  </fieldset>
                </div>
                <div className="col-lg-12">
                  <fieldset>
                    <button
                      type="submit"
                      id="form-submit"
                      className="filled-button"
                    >
                      Send Message
                    </button>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-4">
          <ul className="accordion">
            <li>
              <a>Accordion Title One</a>
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisic elit. Sed
                  voluptate nihil eumester consectetur similiqu consectetur.
                  <br />
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipisic elit. Et,
                  consequuntur, modi mollitia corporis ipsa voluptate corrupti
                  elite.
                </p>
              </div>
            </li>
            <li>
              <a>Second Title Here</a>
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisic elit. Sed
                  voluptate nihil eumester consectetur similiqu consectetur.
                  <br />
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipisic elit. Et,
                  consequuntur, modi mollitia corporis ipsa voluptate corrupti
                  elite.
                </p>
              </div>
            </li>
            <li>
              <a>Accordion Title Three</a>
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisic elit. Sed
                  voluptate nihil eumester consectetur similiqu consectetur.
                  <br />
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipisic elit. Et,
                  consequuntur, modi mollitia corporis ipsa voluptate corrupti
                  elite.
                </p>
              </div>
            </li>
            <li>
              <a>Fourth Accordion Title</a>
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisic elit. Sed
                  voluptate nihil eumester consectetur similiqu consectetur.
                  <br />
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipisic elit. Et,
                  consequuntur, modi mollitia corporis ipsa voluptate corrupti
                  elite.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div className="happy-clients">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="section-heading">
            <h2>Our Happy Customers</h2>
          </div>
        </div>
        <div className="col-md-12">
          <div className="owl-clients owl-carousel">
            <div className="client-item">
              <img src="assets/images/client-01.png" alt={1} />
            </div>
            <div className="client-item">
              <img src="assets/images/client-01.png" alt={2} />
            </div>
            <div className="client-item">
              <img src="assets/images/client-01.png" alt={3} />
            </div>
            <div className="client-item">
              <img src="assets/images/client-01.png" alt={4} />
            </div>
            <div className="client-item">
              <img src="assets/images/client-01.png" alt={5} />
            </div>
            <div className="client-item">
              <img src="assets/images/client-01.png" alt={6} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</>

  
  )
}

export default contact