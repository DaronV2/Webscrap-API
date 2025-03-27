from CloudflareBypasser import CloudflareBypasser 
from DrissionPage import ChromiumOptions,ChromiumPage
import sys

def download(url: str, path : str):
    options = ChromiumOptions()
    options.set_argument('--window-size', '1920,1080')
    options.set_argument('--no-sandbox')
    options.set_argument("--lang=en")
    # options.headless()
    driver = ChromiumPage(options)
    driver.get(url)
    # print(driver.html);
    cf_bypasser = CloudflareBypasser(driver)
    cf_bypasser.bypass()
    print(cf_bypasser.is_bypassed());
    # print(driver.html);
    img = driver._find_elements(('css selector', 'body > img'))
    if img:
        img.get_screenshot(path)
        driver.quit()
        return "Image found"
    else: 
        driver.quit()
        return "No image found"
    # driver._get_screenshot('test.png', '',None,None,True)
    
# script.py

# if __name__ == "__main__":
#     if len(sys.argv) != 3:
#         print("Usage: python script.py <url> <path>")
#         sys.exit(1)

#     url = str(sys.argv[1])
#     path = str(sys.argv[2])
#     result = download(url, path)
#     print(result)
    
print(download("https://sushiscan.net/wp-content/uploads6/KurokoNoBasketTome5-035.jpg", "test.png"))
    



