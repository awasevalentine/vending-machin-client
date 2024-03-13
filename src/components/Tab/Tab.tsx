import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ITab } from "../../interfaces";
import CustomModal from "../Modal/CustomModal";
import AddProduct from "../../views/Products/AddProduct";



const CustomTab = () => {
    const [tab, setTab] = useState<ITab[]>([
        { isActive: true, name: "All Products", path: "/" },
        { isActive: false, name: "My Products", path: "/my-products" },
        { isActive: false, name: "Add Product", path: "/add-product" },
      ]);

    const [editData, setEditData] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected ] = useState("")

    const router = useNavigate()
    const history = useLocation()
    const handleChange = useCallback((selectedTab: ITab) => {
        const updatedTabContent = tab.map(tabItem => ({
            ...tabItem,
            isActive: tabItem.name === selectedTab.name
        }));
        setTab(updatedTabContent);
        setSelected(selectedTab.name)

        if(selectedTab.name !== "Add Product"){
            router(selectedTab.path)
        }else{
            setIsOpen(true)
        }

    },[tab, isOpen]);


    const handleCancelIsOpen = useCallback(() => {
        const updatedTabContent = tab.map(tabItem => ({
            ...tabItem,
            isActive: tabItem.name === "My Products"
        }));
        setIsOpen(false);
        setTab(updatedTabContent);
        setEditData(null)
      }, [isOpen]);

      const handleRouteChange = ()=>{
        const updatedTabContent = tab.map(tabItem => ({
            ...tabItem,
            isActive: tabItem.path === history.pathname
        }));
        setTab(updatedTabContent);
      }

    useEffect(()=>{
        handleRouteChange()
    },[history.pathname])

    return (
        <div className="flex flex-row gap-2 items-end w-full mt-[3rem] pl-6 border-b-2">
            {tab.map((tabItem: ITab) => (
                <div
                    key={tabItem.name}
                    onClick={() => handleChange(tabItem)}
                    className={`${
                        tabItem.isActive ? "bg-slate-400" : "white"
                    } px-[13px] py-[4px] hover:bg-[#C9D7DD] cursor-pointer rounded-t-md border`}
                >
                    <span>{tabItem.name}</span>
                </div>
            ))}
        <CustomModal isOpen={isOpen} onCancel={handleCancelIsOpen}>
        <AddProduct
          setIsOpen={setIsOpen}
          editData={editData}
          setEditData={setEditData}
          setTab={setTab}
          tab={tab}
        />
      </CustomModal>
        </div>
    );
};

export default CustomTab;
