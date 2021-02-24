// Import banner interface
import Banner from "./banner";

/**
 * Define paramaters passed to screen stacks from navigation
 */
export type ScreenStackParams = {
  TableScreen: undefined;
  DetailsScreen: {details: Banner};
}