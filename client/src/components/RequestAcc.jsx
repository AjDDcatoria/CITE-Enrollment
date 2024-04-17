import { SideBarContext } from "@/context/sideBarContext";
import React, { useContext, useEffect, useState } from "react";
import SearchBar from "./ui/SearchBar";
import { createTableHeaders } from "@/utils/User";
import Table, {
  CreateTableHeaders,
  TableBody,
  TableData,
  TableRow,
} from "./ui/Table";
import Button from "./ui/Button";
import { Toaster } from "./ui/toaster";
import { toast } from "./ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { GETRequestAction } from "@/redux/action/chairAction";

function RequestAcc() {
  const { sideBarInfo } = useContext(SideBarContext);
  const [tableHeaders, setTableHeaders] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const [accounst, setAccounts] = useState([]);
  useEffect(() => {
    dispatch(GETRequestAction());
  }, [dispatch]);

  const reqAccounts = useSelector((state) => state.chair?.req_accounts);

  useEffect(() => {
    if (reqAccounts) {
      setAccounts(reqAccounts);
    }
  }, [reqAccounts]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAccount = accounst.filter((account) =>
    account.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    setTableHeaders(createTableHeaders("chair"));
  }, []);

  return (
    <>
      <section className={`content-section ${sideBarInfo} overflow-y-scroll`}>
        <SearchBar
          placeholder={"Search email..."}
          variant={"square"}
          color={"dark"}
          onChange={handleChange}
          position={"mt-5 p-1 relative"}
          icon={
            <i className="bx bx-search search-bar-icon absolute text-3xl text-slate-200 left-5"></i>
          }
          className={
            "outline-none h-9 bg-slate-700 searchBar-width1 text-slate-100 rounded-md"
          }
        />
        {accounst.length == 0 ? (
          <div className="text-5xl text-slate-400 no-result mt-56">
            No Results
          </div>
        ) : (
          <Table className={"rounded-md mt-10 overflow-hidden "}>
            <CreateTableHeaders values={tableHeaders} />
            <TableBody className="bg-white ">
              {filteredAccount.length > 0 ? (
                filteredAccount.map((data, index) => {
                  return (
                    <TableRow
                      key={data.id}
                      className={"border-b-2 border-slate-200"}
                    >
                      <TableData>{index + 1}.</TableData>
                      <TableData>
                        {data.lastname + " " + data.firstname}
                      </TableData>
                      <TableData>{data.department}</TableData>
                      <TableData>{data.email}</TableData>
                      <TableData className={"w-24"}>{data.userID}</TableData>
                      <TableData
                        className={"flex justify-center items-center gap-2"}
                      >
                        <Button
                          text={"Accept"}
                          variant={"submit"}
                          onClick={() => {
                            toast({
                              title: "Accept Successfull !",
                              description: `You accept account ${data.email}`,
                            });
                          }}
                        />
                        <Button
                          text={"Decline"}
                          variant={"cancel"}
                          onClick={() => {
                            toast({
                              title: "Decline Successfull !",
                              description: `You decline account ${data.email}`,
                            });
                          }}
                        />
                      </TableData>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableData
                    colSpan={6}
                    className={"text-center text-2xl font-bold text-slate-500"}
                  >
                    No Result
                  </TableData>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
        <Toaster />
      </section>
    </>
  );
}

export default RequestAcc;
