import React from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { axiosPrivate } from "../../api/axios";
import Table from "../../components/Table";
import ReactSelect from "react-select";
import { UPDATABLE_ROLES, USER_STATUSES } from "../../config";
import LoadingIcon from "../../Icons/LoadingIcon";
import Pagination from "../../components/Pagination";
import Button from "../../components/UI/Button";
import SaveIcon from "../../Icons/SaveIcon";

const User = () => {
  const { manageAccessToken } = useAuth();
  const [allUsers, setAllUsers] = React.useState({});
  const [deleting, setDeleting] = React.useState(false);
  const [editRoles, setEditRoles] = React.useState(null);
  const [editLoading, setEditLoading] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [editId2, setEditId2] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
  const [initLoad, setInitLoad] = React.useState(null); //init, up, down

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const accessToken = await manageAccessToken();
        if (initLoad === null) {
          setInitLoad(true);
        }
        setLoading(true);
        const { data } = await axiosPrivate.get(
          `users?${new URLSearchParams({ page, limit })}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            signal,
          }
        );
        setAllUsers(data);
      } catch (err) {
        const msg = err.response?.data?.message || err.message;
        toast.error(msg);
        console.log(err);
      } finally {
        setLoading(false);
        setInitLoad(false);
      }
    })();

    return () => {
      // Cancel the request when the component unmounts
      controller.abort();
      setLoading(false);
    };
  }, [page]);

  const deleteItem = async (id) => {
    try {
      setDeleting(true);
      const accessToken = await manageAccessToken();
      const { data } = await axiosPrivate.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      // setEstablishments(data);
      toast.success(`User has been deleted!`);
    } catch (e) {
      let msg = e?.response?.data?.message || e.message;
      toast.error(msg, { duration: 2000 });
      console.log(e);
    } finally {
      // common work
      setDeleting(false);
    }
  };

  const updateItemWithPatch = async ({
    updateData = {},
    id,
    updateOn = "status",
  }) => {
    try {
      if (updateOn === "status") {
        setEditId(id);
      }
      if (!id || !Object.keys(updateData || {}).length) {
        console.log(editId, updateData);
        toast.error(`Update data missing!`);
        return;
      }

      setEditLoading(true);
      const accessToken = await manageAccessToken();
      const {
        data: { data: updatedData },
      } = await axiosPrivate.patch(`/users/${id}`, updateData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setAllUsers((p) => {
        const copy = JSON.parse(JSON.stringify(p));
        copy.data = copy.data.map((item) => {
          if (item.id === updatedData.id) {
            return updatedData;
          }
          return item;
        });
        return copy;
      });
      toast.success(`User has been updated!`);
    } catch (e) {
      let msg = e?.response?.data?.message || e.message;
      toast.error(msg, { duration: 2000 });
      console.log(e);
    } finally {
      if (updateOn === "status") {
        setEditId(null);
      } else if (updateOn === "roles") {
        setEditId2(null);
      }
      setEditLoading(false);
    }
  };

  const headers = React.useMemo(() => {
    return {
      className:
        "py-3.5 px-4 text-left text-xs uppercase tracking-widest font-medium text-gray-500",
      items: [
        {
          title: "Name",
          field: "name",
        },
        {
          title: "Profile Pic",
          field: "profilePic",
          render: ({ profilePic, name }) => (
            <div className="text-center">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt={name}
                  className="w-[32px] rounded-[50%] mx-auto"
                />
              ) : (
                ""
              )}
            </div>
          ),
        },
        {
          title: "Email",
          field: "email",
        },
        {
          title: "Username",
          field: "username",
        },
        {
          title: "Phone number",
          field: "phone_number",
        },
        {
          title: "Roles",
          field: "status",
          render: ({ roles, id }) => {
            const options = UPDATABLE_ROLES.map((sts) => ({
              value: sts,
              label: sts,
            }));
            const defVals = roles?.length
              ? options.filter((item) => roles.includes(item.value))
              : [];
            return (
              <div className="lg:flex items-center gap-2 md:w-[50%] md:inline-block sm:inline-block sm:w-[50%] lg:w-full md:mr-2 sm:mr-2">
                <ReactSelect
                  className="w-full"
                  isMulti
                  isDisabled={Boolean(editId)}
                  defaultValue={defVals}
                  options={options}
                  onChange={(changed = []) => {
                    console.log(changed);
                    setEditRoles(changed.map((item) => item.value));
                    setEditId2(id);
                  }}
                />
                <Button
                  disabled={editRoles && editId2 === id ? false : true}
                  onClick={() => {
                    const requestObj = {
                      updateData: { roles: editRoles },
                      id,
                    };
                    updateItemWithPatch(requestObj);
                  }}
                  className="w-[unset] px-2 py-2"
                >
                  {editId2 === id && editLoading ? (
                    <LoadingIcon />
                  ) : (
                    <SaveIcon />
                  )}
                </Button>
              </div>
            );
          },
        },
        {
          title: "Status",
          field: "status",
          render: ({ status, id }) => {
            const options = USER_STATUSES.map((sts) => ({
              value: sts,
              label: sts,
            }));
            return (
              <div className="flex items-center gap-2 md:w-[50%] md:inline-block sm:inline-block sm:w-[50%] lg:block lg:w-full">
                <ReactSelect
                  className="w-full"
                  isDisabled={Boolean(editId)}
                  defaultValue={{ value: status, label: status }}
                  options={options}
                  onChange={(changed) => {
                    if (status === changed.value) return;
                    const requestObj = {
                      updateData: { status: changed.value },
                      id,
                    };
                    updateItemWithPatch(requestObj);
                  }}
                />
                {(editLoading && editId === id && <LoadingIcon />) || ""}
              </div>
            );
          },
        },
        {
          title: <span className="sr-only"> Actions </span>,
          className: "",

          //     <th className="relative py-3.5 pl-4 pr-4 md:pr-0">
          //     <span className="sr-only"> Actions </span>
          //   </th>
        },
      ],
    };
  }, [editId, editId2, editRoles?.length]);

  const handlePage = (_page) => {
    setPage(_page);
  };
  return (
    <div>
      <div className="flex flex-col flex-1 ">
        <main>
          <div className="py-6">
            <div className="px-4 mx-auto sm:px-6 md:px-8">
              <h1 className="text-2xl font-bold text-gray-900">User</h1>
            </div>
            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
              <div className="mt-6">
                {/* <p className="text-base font-bold text-gray-900">Profile</p> */}
                <p className="mt-1 text-sm font-medium text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipis.
                </p>
              </div>
              {(initLoad === false && allUsers?.data?.length && (
                <Table
                  {...{
                    headers,
                    dataItems: allUsers?.data || [],
                    // deleteItem,
                    deleting,
                  }}
                />
              )) ||
                ""}
              {(initLoad === false && allUsers?.pagination?.totalPage > 1 && (
                <Pagination
                  {...{ ...allUsers?.pagination, handlePage, loading }}
                />
              )) ||
                ""}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default User;
