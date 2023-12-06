Changed album model's thumbnail_url from nullable=False to nullable=True

--- Set up AWS account and creating a bucket

Went to: https://aws.amazon.com/ and clicked "Create a new AWS account"

Set root user email address to nharwit1@gmail.com and set the AWS account name to nharwit

Now go back to the sign in page, and sign in as the root user

Use the search bar and type in S3, click on the top one where it says "bucket"

Click "create a bucket", name it "aa-group-project-12-6-23", leave AWS Region set to the default one which was "US East (Ohio) us-east-2"

Click on ACLs enabled (swap from recommended default setting)

Leave Bucket owner preferred checked

Uncheck "Block all public access" to not block all public access, then check the box acknowledging this change

Leave rest as default, Bucket versioning is set to disable, no tags, default encryption is "server-side encryption with Amazon S3 managed keys), bucket key is set to enable

Click create bucket

--- Create a new user

Go to this link: https://console.aws.amazon.com/iam/home?#/users OR search for IAM in the search field and select IAM

Click create user, name it "aa-group-project" under user name, don't check the box "porovide user access..."

Click next, then click "attach policies directly", click "create policy"

Click on json, then paste the following in:

{
"Version": "2012-10-17",
"Statement": [
{
"Sid": "Stmt1420751757000",
"Effect": "Allow",
"Action": ["s3:*"],
"Resource": "arn:aws:s3:::aa-group-project-12-6-23/\*"
}
]
}

Click next, name it "aa-group-project-access", click create policy, then click the refresh icon on the policies (not for the whole browser)

Select the policy we just created, then click next, then create user

Go to the users page: https://us-east-1.console.aws.amazon.com/iamv2/home?region=us-east-2#/users
or search for users in the search and click "users"

Click ours, then security credentials, scroll down to access keys, click "create access keys", select "application running outside of AWS", click next, don't set a tag, click "create access key"

On the next page, do NOT close the page (we can recreate a new one if needed)
Save both the "Access key" and the "Secret access key" into our .env in our project

Set S3_KEY to our "Access key" found on AWS
Set S3_SECRET to our "Secret access" found on AWS

Do the same on Render's environment variables
SEt S3_BUCKET to "aa-group-project-12-6-23"

The save changes button wasn't working for 5 minutes on Render.com lol...

--- Modify backend of our code now

pipenv install boto3 from the root of the project, notice that our Pipfile now shows boto3 there

open our requirements.txt and add: boto3==1.28.63

create a aws.py file in the /app/api folder, then copy paste the following in:

import boto3
import botocore
import os
import uuid

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif", "mp3"}

s3 = boto3.client(
"s3",
aws_access_key_id=os.environ.get("S3_KEY"),
aws_secret_access_key=os.environ.get("S3_SECRET")
)

def get_unique_filename(filename):
ext = filename.rsplit(".", 1)[1].lower()
unique_filename = uuid.uuid4().hex
return f"{unique_filename}.{ext}"

def upload_file_to_s3(file, acl="public-read"):
try:
s3.upload_fileobj(
file,
BUCKET_NAME,
file.filename,
ExtraArgs={
"ACL": acl,
"ContentType": file.content_type
}
)
except Exception as e: # in case the your s3 upload fails
return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}

def remove_file_from_s3(image_url): # AWS needs the image file name, not the URL, # so you split that out of the URL
key = image_url.rsplit("/", 1)[1]
print(key)
try:
s3.delete_object(
Bucket=BUCKET_NAME,
Key=key
)
except Exception as e:
return { "errors": str(e) }
return True

--- Modify existing post forms

Go to album form and add: from flask_wtf.file import FileField, FileAllowed, FileRequired
Also add this: from app.api.aws import ALLOWED_EXTENSIONS

REPLACE the thumbnail_url with this instead in our album_form.py thumbnail_url = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])

Go to /app/api/album_routes.py, and add this to the top: from app.api.aws import (
upload_file_to_s3, get_unique_filename)

In our album_form.py, find the create route, then add the following just under the form.validate_on_submit():

if form.validate_on_submit():

        # ***** Added this block below for AWS ***** #
        image = form.data["thumbnail_url"] # make sure this matches our album_form.py's thumbnail_url column
        image.filename = get_unique_filename(image.filename) # use helper function to generate teh unique filename using the uuid
        # upload contains our errors for debugging incase upload to AWS fails
        upload = upload_file_to_s3(image) # image is an actual file we are sending to AWS, the file will have all sorts of metadata AWS needs to store, most important is the actual file data (ex. image / mp3)
        print(upload) # print out the error

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            return {"errors": upload.errors}

        url = upload["url"]
        # ***** Added this block above for AWS ***** #

        new_album = Album(
            user_id=form.data['user_id'],
            album_name=form.data['album_name'],
            # changed this line below from:
            # thumbnail_url=form.data['thumbnail_url'],
            thumbnail_url=url, # set the name of our image url column in our database to url found in the line url = upload["url"]
            release_year=form.data['release_year']
        )

--- Refactor frontend to take in a file input
