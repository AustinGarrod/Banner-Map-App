// Import banner interface
import Banner from "../interfaces/banner";

/**
 * Define paramaters passed to screen stacks from navigation
 */
export type ScreenStackParams = {
  HomeScreen: undefined;
  DetailsScreen: {details: Banner};
}