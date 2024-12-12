//this are database related service

import { Client, Databases, ID, Storage, Query } from 'appwrite'
import conf from '../conf/conf.js'

export class Service{
    client= new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectID);
         this.databases= new Databases(this.client);
         this.bucket- new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage,
        status, userId}){
            try {
                 return await this.databases.createDocument(
                    conf.appwriteDatabaseID,
                    conf.appwriteCollectionID,
                    slug,
                    {
                        title, content, featuredImage, status, userId,
                    }
                 ) 

            } catch (error) {
                console.log("Appwrite serive:: createPost::error", error);
            }
        }

        async updatePost(slug, {title, content, featuredImage,
            status}){
                try {
                   return await this.databases.updateDocument(
                    conf.appwriteDatabaseID,
                    conf.appwriteCollectionID,
                    slug,
                    {
                        title, content, featuredImage, status,
                    }
                   )    
                } 
                
                catch (error) {
                    console.log("Appwrite serive:: updtePost::error", error);
                }
            }

        async deletePost(slug){
            try {
                  await this.databases.deleteDocument(
                    conf.appwriteDatabaseID,
                    conf.appwriteCollectionID,
                    slug,
                )   
                return true; 
            } 
            
            catch (error) {
                console.log("Appwrite serive:: deletePost::error", error);
                return false;
            }
        }

        async getPost(slug){
            try {
                  return await this.databases.getDocument(
                       conf.appwriteDatabaseID,
                       conf.appwriteCollectionID,
                       slug,   
                  )    
            } 
            
            catch (error) {
               console.log("Appwrite serive:: getPost::error", error);
               return false;
            }
        }
        // We have indexes in collection so we can query data here we take only active posts
        async getPosts(queries= [Query.equal("status", "active")]){
            try {
                return await this.databases.listDocuments(
                    conf.appwriteDatabaseID,
                    conf.appwriteCollectionID,
                    queries,
                 
                )
            } 
            
            catch (error) {
                console.log("Appwrite serive:: getPosts::error", error);
                return false;
            }
        }
        
        async uploadFile(file){
            try {
              return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
              )    
            } 
            catch (error) {
                console.log("Appwrite serive:: uploadFile::error", error);
                return false;
            }
        }

        async deleteFile(fileID){
            try {
                    await this.bucket.deleteFile(
                    conf.appwriteBucketID,
                    fileID
                ) 
                return true;  
            } 
            catch (error) {
                console.log("Appwrite serive:: deleteFile::error", error);
                return false;
            }
        }

        getFilePreview(fileID){
            try {
                return this.bucket.getFileView(
                    conf.appwriteBucketID,
                    fileID
                )    
            } catch (error) {
                console.log("Appwrite serive:: getFilePreview::error", error);
            }
            
        }
        
    
}




const service= new Service()

export default service