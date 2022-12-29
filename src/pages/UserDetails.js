import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";

const UserDetails = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // for showing data per page
  const [showperpage, setPerPage] = useState(2);

  // for pagination
  const [pagination, setPagination] = useState({
    start: 0,
    end: showperpage,
  });

  const handlerPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  // const { name } = useParams();

  const testData = () => {
    const getUser = localStorage.getItem("item");

    if (getUser && getUser.length) {
      const user = JSON.parse(getUser);
      setItems(user);
    }
  };
  useEffect(() => {
    testData();
  }, []);

  const handlerDelete = (id) => {
    console.log(id);
    const getUser = localStorage.getItem("item");
    const user = JSON.parse(getUser);

    const filtered = user.filter((ele) => {
      return ele.id !== id;
    });

    localStorage.setItem("item", JSON.stringify(filtered));
    testData();
  };

  const handlerEdit = (ele, value) => {
    // localStorage.setItem("edit", ele);

    navigate(`/users/EditDetails/${ele.id}`, { state: ele });
  };

  const handlerView = (ele) => {
    navigate(`/users/ViewDetails/${ele.id}`, { state: ele });
  };

  const profileURL =
    "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg";
  return (
    <>
      <Navbar />
      <div className="container content">
        <div className="border mt-4 p-4">
          <h3 className="text-center bg-info p-2 mb-3">
            Welcome To User Details
          </h3>
          {items ? (
            items.slice(pagination.start, pagination.end).map((ele) => {
              return (
                <>
                  <div className="row my-4" key={ele.id}>
                    <div className="col-md-3">
                      <div className="d-flex flex-column align-items-center ">
                        <img
                          src={profileURL}
                          alt="profile_pic"
                          className="img-thumbnail"
                          height={200}
                          width={200}
                        />
                      </div>
                    </div>

                    <div className="col-md-9 d-flex align-items-center">
                      <div className="ms-4">
                        <h4>
                          Name :<span>{ele.name}</span>
                        </h4>
                        <h4>
                          Email :<span>{ele.email}</span>
                        </h4>
                        <h4>
                          PhoneNo :<span>{ele.phoneno}</span>
                        </h4>
                        <h4>
                          Gender :<span>{ele.gender}</span>
                        </h4>
                        <p>
                          Accepted Terms And Conditions :
                          <span>{ele.terms ? "YES" : "NO"}</span>
                        </p>
                      </div>
                      <div className="btngroup">
                        <button
                          className="view-btn common-btn"
                          onClick={() => handlerView(ele)}
                        >
                          View
                        </button>
                        <button
                          className="edit-btn common-btn"
                          onClick={() => handlerEdit(ele)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn common-btn"
                          onClick={() => handlerDelete(ele.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <div>
              <h1>No User Details available</h1>
            </div>
          )}
        </div>
        <Pagination
          showperpage={showperpage}
          handlerPaginationChange={handlerPaginationChange}
          total={items.length}
        />
      </div>
    </>
  );
};

export default UserDetails;
