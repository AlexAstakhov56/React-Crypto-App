import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/cryptoContext";
import { useEffect, useState } from "react";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default function AppHeader() {
  const { crypto } = useCrypto();
  const [selectOpen, setSelectOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    function keypress(event) {
      if (event.key === "/") {
        setSelectOpen((prev) => !prev);
      }
    }
    document.addEventListener("keypress", keypress);

    return () => document.removeEventListener("keypress", keypress);
  }, []);

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        onSelect={handleSelect}
        style={{
          width: 250,
        }}
        open={selectOpen}
        onClick={() => setSelectOpen((prev) => !prev)}
        value={`press "/" to open`}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
          ...coin,
        }))}
        optionRender={(option) => (
          <Space>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: 25, marginRight: 7 }}
                src={option.data.icon}
              />{" "}
              {option.data.label}
            </div>
          </Space>
        )}
      />
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Asset
      </Button>

      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        width={600}
        title="Add Asset"
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}
