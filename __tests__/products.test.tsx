import ProductTable from "@/components/product-table";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { product } from "../__mocks__/product.mock";
import ReviewsDialog, {
  getRelativeTime,
} from "@/components/product-table/reviews-dialog";

function mockFetch(data: any) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data,
    })
  );
}

const onClose = jest.fn();

describe("Products page", () => {
  it("should render the products table", () => {
    render(<ProductTable products={[]} />);

    const table = screen.getByRole("table");

    expect(table).toBeInTheDocument();
  });

  it("should render the table header with correct column names", () => {
    render(<ProductTable products={[]} />);

    const tableHeader = screen.getByRole("rowheader");

    expect(tableHeader).toBeInTheDocument();

    const columnHeaders = [
      "id",
      "title",
      "description",
      "category",
      "price",
      "discount",
      "rating",
      "stock",
      "tags",
    ];

    columnHeaders.forEach((column) => {
      expect(
        screen.getByRole("columnheader", { name: new RegExp(column, "i") })
      ).toBeInTheDocument();
    });
  });

  it("should render 'view reviews' button for each product", () => {
    // Render the products page with mock product data
    render(<ProductTable products={[product]} />);

    const viewReviewsButtons = screen.getByRole("button", {
      name: /view reviews/i,
    });

    expect(viewReviewsButtons).toBeInTheDocument();
  });

  it("should render 'No results.' when no products are available", () => {
    // Render the products page with no products
    render(<ProductTable products={[]} />);
    const noResultsText = screen.getByText(/no results/i);
    expect(noResultsText).toBeInTheDocument();
  });

  it("should render the correct number of rows", () => {
    // adding a mock product generator function to generate products with unique ids, else the test get unique key error
    const generateMockProduct = (id: number) => ({ ...product, id });

    render(
      <ProductTable
        products={[
          generateMockProduct(1),
          generateMockProduct(2),
          generateMockProduct(3),
        ]}
      />
    );

    const rows = screen.getAllByRole("row");

    expect(rows).toHaveLength(4); // 1 header row + 3 data rows
  });

  it('should fetch product and open the reviews dialog when "view reviews" button is clicked', async () => {
    window.fetch = mockFetch(product);

    render(<ProductTable products={[product]} />);

    const viewReviewsButton = screen.getByRole("button", {
      name: /view reviews/i,
    });

    // Click the "view reviews" button with act() to trigger the fetch
    await act(async () => fireEvent.click(viewReviewsButton));

    // Check that the dialog is in the document
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
  });

  it("should show skeleton loader when loading product reviews", () => {
    render(<ReviewsDialog onClose={onClose} product="loading" />);

    const skeletonLoader = screen.getByTestId("skeleton-loader");
    expect(skeletonLoader).toBeInTheDocument();
  });

  it("should render readonly review rating when loaded", () => {
    render(<ReviewsDialog onClose={onClose} product={product} />);

    // Check if the review rating is not empty
    if (product.reviews.length > 0) {
      const reviewStars = screen.getByTestId("review-rating");
      // checking if the rating is readonly
      const isReadonly = reviewStars
        .getAttribute("class")
        ?.includes("MuiRating-readOnly");

      expect(isReadonly).toBe(true);
      expect(reviewStars).toBeInTheDocument();
    }
  });

  it("should display relative time for review date", () => {
    render(<ReviewsDialog onClose={onClose} product={product} />);

    // Check if the review date is not empty
    if (product.reviews.length > 0) {
      const reviewDate = product.reviews[0].date;
      const relativeTime = getRelativeTime(new Date(reviewDate));

      expect(relativeTime).not.toBe("");
    }
  });

  it('should close dialog when "close" button is clicked', () => {
    render(<ReviewsDialog onClose={onClose} product={product} />);

    const closeButton = screen.getByRole("button", { name: /close/i });

    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
