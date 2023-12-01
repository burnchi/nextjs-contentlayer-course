import os
import re
import time

# 替换成项目文章路径
root_folder =  r"E:\Nextjs\test\posts" + '\\'  
file_list = []
# 匹配md中图片
picpattern = "!\[.*?\]\(E:\\\\mdpic\\\\(.*?)\)"
picpattern1 = r"""<img src="E:\\mdpic\\(.*?)".*?/>"""

#修改md样式为Next组件
def replacement_function(match):
    image_name = match.group(1)
    return f"""
<Image
src="/mdpic/{image_name}"
width="1920"
height="1080"
alt="{image_name}"
className='w-full'
/>
"""
# 收集文章路径下的所有文件路径
for root, dirs, files in os.walk(root_folder):
    for file in files:
        file_path = os.path.join(root, file)
        file_list.append(file_path)
# print(file_list)

# 遍历所有文件的路径
for file_path in file_list:
    try:
        # 逐个打开并读取内容
        with open(file_path, "r",encoding="utf-8") as file:
            file_content = file.read()
        
        # 找到md中图片样式后替换成Next组件
        modified_text1 = re.sub(picpattern, replacement_function, file_content)
        modified_text2 = re.sub(picpattern1, replacement_function, modified_text1)

        # 写入文件
        with open(file_path, "w",encoding="utf-8") as file:
            file.write(modified_text2)
            print(f"{file_path} 写入成功")

        time.sleep(0.5)
    except Exception as e:
        print("发生了异常:", e)
