import os

for f in os.listdir('data_normal'):
    char = 'а'
    if char in f:
        
        print(f)
        new = f.replace(char, 'a')
        os.system(f'mv "data_normal/{f}" data_normal/{new}')
