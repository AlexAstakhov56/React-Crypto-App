import { Flex, Typography } from "antd";

export default function CoinInfo({ coin }) {
  return (
    <Flex align="center">
      <img src={coin.icon} style={{ width: 40, marginRight: 10 }} />
      <Typography.Title level={2} style={{ margin: 0 }}>
        ({coin.symbol}) {coin.id}
      </Typography.Title>
    </Flex>
  );
}
