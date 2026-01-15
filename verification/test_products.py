
from playwright.sync_api import sync_playwright, expect

def test_product_flow():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Navigate to homepage
        print("Navigating to homepage...")
        page.goto("http://localhost:3000")

        # 2. Wait for products to load
        print("Waiting for products...")
        try:
            # Look for Product Card class or similar
            # Based on product-card.tsx, it has a Link with href starting with /products/
            page.wait_for_selector('a[href^="/products/"]', timeout=30000)

            # 3. Find first product link
            product_links = page.locator('a[href^="/products/"]')
            count = product_links.count()
            print(f"Found {count} product links")

            if count > 0:
                first_link = product_links.first
                href = first_link.get_attribute("href")
                print(f"Clicking product: {href}")

                # Click it
                first_link.click()

                # 4. Verify navigation
                # Expect URL to contain /products/
                page.wait_for_url(f"**/products/**", timeout=30000)
                print(f"Navigated to {page.url}")

                # 5. Check for product details
                # Wait for title
                page.wait_for_selector("h1", timeout=30000)
                title = page.locator("h1").first.inner_text()
                print(f"Product Title: {title}")

                # Take screenshot
                page.screenshot(path="verification/product_page.png")
                print("Screenshot taken.")
            else:
                print("No products found on homepage.")
                page.screenshot(path="verification/homepage_no_products.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    test_product_flow()
