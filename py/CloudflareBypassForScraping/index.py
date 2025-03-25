from CloudflareBypasser import CloudflareBypasser 
from DrissionPage import ChromiumOptions,ChromiumPage
import sys

def download(url: str, path : str):
    options = ChromiumOptions()
    options.headless()
    driver = ChromiumPage(options)
    driver.get(url)
    cf_bypasser = CloudflareBypasser(driver)
    cf_bypasser.bypass()
    img = driver._find_elements(('css selector', 'img'))
    if img:
        img.get_screenshot(path)
        driver.quit()
        return "Image found"
    else: 
        driver.quit()
        return "No image found"
    # driver._get_screenshot('test.png', '',None,None,True)
    
# script.py

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python script.py <url> <path>")
        sys.exit(1)

    url = str(sys.argv[1])
    path = str(sys.argv[2])
    result = download(url, path)
    print(result)
    
# download("https://sushiscan.net/wp-content/uploads6/KurokoNoBasketTome5-035.jpg")
    



