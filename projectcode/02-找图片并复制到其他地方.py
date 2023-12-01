import os
import re
import time
import shutil

# 替换成项目文章存放的路径
pic_root_folder =  r"E:\Nextjs\test\posts" + '\\'  
# typora存放图片的路径
pic_source_folder = r"E:\mdpic" + '\\'
# 将typora图片复制到的路径
pic_dest_folder = r"E:\Nextjs\test\public\mdpic" + '\\'
file_list = []
pic_list = []
picpattern = """src=\"/mdpic/(.*?)\""""

# 检查路径是否存在
if not os.path.exists(pic_dest_folder):
    # 如果不存在，则创建文件夹
    os.makedirs(pic_dest_folder)
    print(f"文件夹 '{pic_dest_folder}' 已创建。")
else:
    print(f"文件夹 '{pic_dest_folder}' 已存在。")

# 收集根目录下的所有文件
for root, dirs, files in os.walk(pic_root_folder):
    for file in files:
        file_path = os.path.join(root, file)
        file_list.append(file_path)

for file_path in file_list:
    try:
        # 读每一个文件
        with open(file_path, "r",encoding="utf-8") as file:
            file_content = file.read()
        
        # print(modified_text) 
        # 找到图片信息,截取image-20231027230732133.png这部分
        # src="/mdpic/image-20231027230732133.png"
        pic = re.findall(picpattern,file_content)
        if pic:
            pic_list += pic
        time.sleep(0.5)
    except Exception as e:
        print("发生了异常:", e)

# 拿图片名列表拼接图片路径
# print(pic_list)
for i in pic_list:
    pic_s_path = pic_source_folder + i
    pic_d_path = pic_dest_folder + i
    # 将所有读到的图片路径复制到项目中
    try:
        shutil.copy(pic_s_path, pic_d_path)
        print(i,"图片已复制到",pic_dest_folder)
    except Exception as e:
        print("发生了异常:", e) 
    time.sleep(0.5)
