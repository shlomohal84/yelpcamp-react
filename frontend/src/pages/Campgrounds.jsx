import React from "react";

function Campgrounds() {
  return (
    <>
      <div id="map"></div>
      <h1>All Campgrounds</h1>
      <div>
        <a href="/campgrounds/new">Add Campground</a>
      </div>
      <ul>
        {/* <% for(let elm of campgrounds){ %> */}
        <div className="card mb-3">
          <div className="row">
            <div className="col-md-4">
              {/* <%if (elm.images.length){ %> */}
              <img className="img-fluid" src="#" alt="" />
              {/* <% } else{%> */}
              <img className="img-fluid" src="#" alt="" />
              {/* <%} %> */}
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{/*  <%=elm.title %> */} </h5>
                <h5>{/* <{%=elm.properties.popUpMarkup %>} */}</h5>
                <p className="card-text">{/* <%=elm.description %> */}</p>
                <p className="card-text">
                  <small className="text-muted">
                    {/* <%=elm.location %> */}
                  </small>
                </p>
                <a href="/" className="btn btn-primary">
                  View {/* <%=elm.title %> */}
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <% } %> */}
      </ul>
    </>
  );
}

export default Campgrounds;
