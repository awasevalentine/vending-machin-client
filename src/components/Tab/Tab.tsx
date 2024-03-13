import { useCallback } from "react";

type Props ={
    tabContent: {isActive: boolean, name: string}[];
    icon?: React.ReactNode;
    setTab: any;
    callback: (e) => void;
    tab: any;
}

const Tab = ({ tabContent, icon, callback, setTab, tab }: Props) => {
    const handleChange = useCallback((selectedTab) => {
        const updatedTabContent = tabContent.map(tabItem => ({
            ...tabItem,
            isActive: tabItem.name === selectedTab.name
        }));
        setTab(updatedTabContent);
        callback(selectedTab);
    },[tab]);


    return (
        <div className="flex flex-row gap-2 items-end w-full mt-[3rem] pl-6 border-b-2">
            {tabContent.map(tabItem => (
                <div
                    key={tabItem.name}
                    onClick={() => handleChange(tabItem)}
                    className={`${
                        tabItem.isActive ? "bg-slate-400" : "white"
                    } px-[13px] py-[4px] hover:bg-[#C9D7DD] cursor-pointer rounded-t-md border`}
                >
                    <span>{tabItem.name}</span>
                    {icon && <>{icon}</>}
                </div>
            ))}
        </div>
    );
};

export default Tab;
