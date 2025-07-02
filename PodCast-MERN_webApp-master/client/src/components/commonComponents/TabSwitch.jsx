//custom tab switch
const TabSwitch = ({ tabs, activeTab, setActiveTab }) => (
    <div className="border-b-2 border-gray-300 mt-10 flex gap-5">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`font-roboto font-semibold pb-2 ${
            activeTab === tab
              ? "border-b-4 border-primary text-primary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );

  
  export default TabSwitch