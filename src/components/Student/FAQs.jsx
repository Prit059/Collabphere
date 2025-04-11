import React from 'react'
import "./FAQs.css"
import "./media2.css"
function FAQs() {
  return (
    <section className="container-fluid py-lg-5 py-sm-4 py-3 faqs">
        <div className="container">
          <div className="row justify-content-between gy-4 align-items-center">
              <h1 id='faqh1'>FAQs</h1>
              <p id='faqp'>Frequently Asked Questions about CollabSphere.</p>
            <div className="col-lg-7">
              <div className="accordion" id="accordionExample">

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      What is Collabsphere?
                    </button>
                  </h2>
                  <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div className="accordion-body">CollabSphere is an online platform that connects students from various disciplines with like-minded professionals. It provides a unique opportunity for students to work together, share projects, and learn from each other.</div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      How do I create a new club?
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">To create a new club, go to the Clubs page and click on the "Add New Club" button. Fill in the required details and submit the form. And Only Access Admin (Club Main Faculty)</div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      How do I join a club?
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">To join a club, go to the Clubs page and click on the "Join Club" button. Fill in your details and submit the form. Admin is approve request than join the club.</div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                      Is there a membership charge for clubs?
                    </button>
                  </h2>
                  <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                    <div className="accordion-body">No, fill joining form and explore the clubs.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-lg-5'>
              <img id='faqimg' src="./images/faqs.png" alt="" />
            </div>
          </div>
        </div>
        </section>
  )
}

export default FAQs