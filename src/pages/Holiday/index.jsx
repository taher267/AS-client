import React from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { axiosPrivate } from "../../api/axios";
import Table from "../../components/Table";
import zeroSixByDaysName from "../../utils/zero-six-by-days-name";
import { Link } from "react-router-dom";
import { HOLIDAY_PATH } from "../../config";
import PencilSquareIcon from "../../Icons/PencilSquareIcon";
import LinkButton from "../../components/UI/LinkButton";

const Department = () => {
  const { manageAccessToken } = useAuth();
  const [allHolidays, setAllHolidays] = React.useState({});
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const accessToken = await manageAccessToken();
        const { data } = await axiosPrivate.get(`holidays`, {
          headers: { Authorization: `Bearer ${accessToken}` },
          signal,
        });
        setAllHolidays(data);
      } catch (err) {
        const msg = err.response?.data?.message || err.message;
        toast.error(msg);
        console.log(err);
      }
    })();
    return () => {
      // Cancel the request when the component unmounts
      controller.abort();
    };
  }, []);

  const deleteItem = async (id) => {
    try {
      setDeleting(true);
      const accessToken = await manageAccessToken();
      const { data } = await axiosPrivate.delete(`/departments/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      // setEstablishments(data);
      toast.success(`Department has been deleted!`);
    } catch (e) {
      let msg = e?.response?.data?.message || e.message;
      toast.error(msg, { duration: 2000 });
      console.log(e);
    } finally {
      // common work
      setDeleting(false);
    }
  };

  const headers = React.useMemo(
    () => ({
      className:
        "py-3.5 px-4 text-left text-xs uppercase tracking-widest font-medium text-gray-500",
      items: [
        {
          title: "Name",
          field: "name",
        },
        {
          title: "Weekend",
          field: "weekly",
          render: ({ weekly }) => {
            return (
              <div>
                {weekly?.map((item) => zeroSixByDaysName(item)).join(", ")}
              </div>
            );
          },
        },
        {
          title: "occasional",
          field: "occasional",
          render: ({ occasional }) => {
            return <div>{occasional?.join?.(", ")}</div>;
          },
        },
        {
          title: "Actions",
          render: (props) => {
            return (
              <div>
                <LinkButton
                  href={`${HOLIDAY_PATH}/${props.id}/edit`}
                  state={props}
                  className="px-3 py-2 w-[unset]"
                  title="Edit"
                >
                  <PencilSquareIcon />
                </LinkButton>
              </div>
            );
          },
        },

        // {
        //   title: <span className="sr-only"> Actions </span>,
        //   className: "",

        //   //     <th className="relative py-3.5 pl-4 pr-4 md:pr-0">
        //   //     <span className="sr-only"> Actions </span>
        //   //   </th>
        // },
      ],
    }),
    []
  );

  return (
    <div>
      <div className="flex flex-col flex-1">
        <main>
          <div className="py-6">
            <div className="px-4 mx-auto sm:px-6 md:px-8">
              <h1 className="text-2xl font-bold text-gray-900">Holidays</h1>
            </div>
            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
              <div className="mt-6">
                {/* <p className="text-base font-bold text-gray-900">Profile</p> */}
                <p className="mt-1 text-sm font-medium text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipis.
                </p>
              </div>
              <Table
                {...{
                  headers,
                  dataItems: allHolidays?.data || [],
                  deleteItem,
                  deleting,
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Department;
