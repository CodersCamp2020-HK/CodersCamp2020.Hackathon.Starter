import { styled } from "@material-ui/core";
import { FOOTER_HEIGHT } from '../footer/Footer';

const Container = styled("div")({
  position: "relative",
  display: "flex",
  minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`,
  flexDirection: "column",
  paddingBottom: 48,
});

export default Container;
