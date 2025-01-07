import httpResponse from '../util/httpResponse.js'
import responseMessage from '../constant/responseMessage.js'
import httpError from '../util/httpError.js'
import quicker from '../util/quicker.js'
import databaseService from '../service/databaseService.js'
import { uploadOnCloudinary } from '../service/cloudinaryService.js'
import { ValidateAddProduct, ValidateAddUtilsData, ValidateContactUs, validateJoiSchema, ValidateLogin, ValidateSoulution, ValidateSupportEnquiry, ValidateUpdateContactUs, ValidateUpdateProduct, ValidateUpdateSolution, ValidateUpdateSupportEnquiry, ValidateUpdateUtilsData } from '../service/validationService.js'
import { allowedUsers, EApplicationEnvironment } from '../constant/application.js'
import config from '../config/config.js'

export default {
    self: (req, res, next) => {
        try {
            httpResponse(req, res, 200, responseMessage.SUCCESS)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    apiDetailsCheck: (req, res, next) => {
        try {
            const response = quicker.apiDetailsStatus
            httpResponse(req, res, 200, responseMessage.SUCCESS,response)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    health: (req, res, next) => {
        try {
            const healthData = {
                application: quicker.getApplicationHealth(),
                system: quicker.getSystemHealth(),
                timestamp: Date.now()
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, healthData)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    locationStats: async (req, res, next) => {
        try {
            const { lat, long } = req.query;
            const locationDetails = await quicker.getLocationDetails();
    
            if (!locationDetails) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('Location')), req, 400);
            }
    
            if (lat && long) {
                locationDetails.latitude = lat;
                locationDetails.longitude = long;
            }
    
            const newLocationStats = await databaseService.savelocationStats(locationDetails);
            if (!newLocationStats) {
                return httpError(next, new Error(responseMessage.FAILED_TO_SAVE), req, 500);
            }
    
            httpResponse(req, res, 200, responseMessage.SUCCESS, newLocationStats);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    getLocationStats: async (req, res, next) => {
        try {
            const locationStats = await databaseService.getLocationStats()
            httpResponse(req, res, 200, responseMessage.SUCCESS, locationStats)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    websiteCount: async (req, res, next) => {
        try {
            const locationStats = await databaseService.getLocationStats()
            httpResponse(req, res, 200, responseMessage.SUCCESS, locationStats.length)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    uploadFile: async (req, res, next) => {
        try {
            const { body } = req

            if (!req.file) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE('No file uploaded')), req, 400)
            }

            if (!body.category) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE('Category is required')), req, 400)
            }

            const uploadedFile = await uploadOnCloudinary(req.file.path, body.category)

            if (!uploadedFile) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE('File upload failed')), req, 500)
            }

            return httpResponse(req, res, 200, responseMessage.SUCCESS, uploadedFile.secure_url)
        } catch (err) {
            return httpError(next, err, req, 500)
        }
    },
    addProduct: async (req, res, next) => {
        try {
            const { body } = req

            const { value, error } = validateJoiSchema(ValidateAddProduct, body)

            if (error) {
                return httpError(next, error, req, 422)
            }

            const { name, description,bestSuitedFor, categories, subcategories, specification, feature, productImageUrl, applicationImageUrls, brochureUrl, SKUId } = value

            const productData = {
                name,
                description,
                bestSuitedFor,
                categories,
                subcategories,
                specification,
                feature,
                productImageUrl,
                brochureUrl,
                productImageUrl,
                applicationImageUrls,
                SKUId
            }

            const savedProduct = await databaseService.saveProduct(productData)

            if (!savedProduct) {
                return httpError(next, new Error(responseMessage.FAILED_TO_SAVE), req, 500)
            }

            httpResponse(req, res, 201, responseMessage.SUCCESS, productData)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    fetchProduct: async (req, res, next) => {
        try {
            const { query = 'all', categories, subcategories, limit = 100, offset = 0 } = req.query

            let findQuery = {}

            switch (query.toLowerCase()) {
                case 'all':
                    break

                case 'active':
                    findQuery.isActive = true
                    break
                case 'inactive':
                    findQuery.isActive = false
                    break

                case 'popular':
                    findQuery = { isEnquired: { $gt: 0 } }
                    break

                case 'required':
                    if (categories) {
                        findQuery.categories = categories
                    }
                    if (subcategories) {
                        findQuery.subcategories = subcategories
                    }
                    break

                default:
                    break
            }

            const products = await databaseService.queryProductData(findQuery, limit, offset)

            const total = await databaseService.countDocuments(findQuery)

            const response = {
                total,
                limit: Number(limit),
                offset: Number(offset),
                products
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, response)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    querySingleProduct: async(req, res, next) => {
        try {
            const { id } = req.params
            if (!id) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('ID')), req, 404)
            }
            const response = await databaseService.queryProductDataById(id)
            if (!response) {
                return httpError(next, new Error(responseMessage.NOT_FOUND), req, 404)
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, response)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    updateProduct: async (req, res, next) => {
        try {
            const { body } = req
            const { id } = req.params

            const { value, error } = validateJoiSchema(ValidateUpdateProduct, body)

            if (error) {
                return httpError(next, error, req, 422)
            }

            const { name, description, categories, subcategories, specification, feature, isActive, isEnquired } = value

            const updatedProductData = {
                ...(name && { name }),
                ...(description && { description }),
                ...(categories && { categories }),
                ...(subcategories && { subcategories }),
                ...(specification && { specification }),
                ...(feature && { feature }),
                ...(isActive !== undefined && { isActive }),
                ...(isEnquired !== undefined && { isEnquired })
            }

            const updatedProduct = await databaseService.updateProductById(id, updatedProductData)

            if (!updatedProduct) {
                return httpError(next, new Error(responseMessage.NOT_FOUND), req, 404)
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, updatedProduct)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    increaseIsEnquired: async (req, res, next) => {
        try {
            const { id } = req.params

            if (!id) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('Requested Product')))
            }

            const response = await databaseService.increaseIsEnquired(id)

            if (!response) {
                return httpError(next, new Error(responseMessage.FAILED_TO_SAVE), req, 500)
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    addUtilsData: async (req, res, next) => {
        try {
            const { body } = req
            
            const { value, error } = validateJoiSchema(ValidateAddUtilsData, body)

            if (error) {
                return httpError(next, error, req, 422)
            }
            
            const { title, utilsData } = value
            const newUtilsData = await databaseService.saveUtilsData({
                title,
                utilsData
            })
            if(!newUtilsData){
                return httpError(next, new Error(responseMessage.FAILED_TO_SAVE), req, 500)
            }

            httpResponse(req, res, 201, responseMessage.SUCCESS)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    fetchUtilsData: async (req, res, next) => {
        try {
            const { id } = req.params;
            const utilsData = await databaseService.fetchUtilsData(id);
            
            if (!utilsData) {
                return httpError(next, new Error(responseMessage.NOT_FOUND), req, 404);
            }
    
            httpResponse(req, res, 200, responseMessage.SUCCESS,utilsData);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    updateUtilsData: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { body } = req;
            
            if(!id) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE('Document ID is missing')), req, 400);
            }
            const { value, error } = validateJoiSchema(ValidateUpdateUtilsData, body);
            if (error) {
                return httpError(next, error, req, 422);
            }
    
            const updatedUtilsData = await databaseService.updateUtilsData(id, value);
    
            if (!updatedUtilsData) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE('Failed to Update the data')), req, 500);
            }
    
            httpResponse(req, res, 200, updatedUtilsData);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    removeUtilsData: async (req, res, next) => {
        try {
            const { id } = req.params;
            
            if (!id) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE('Please provide an ID')), req, 400);
            }
    
            const deletedUtilsData = await databaseService.removeUtilsData(id);
    
            if (!deletedUtilsData) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE('Failed to delete the data')), req, 500);
            }
    
            httpResponse(req, res, 200, responseMessage.SUCCESS);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    saveContactUs: async (req, res, next) => {
        try {
            const { body } = req

            const { value, error } = validateJoiSchema(ValidateContactUs, body)
            if (error) {
                return httpError(next, error, req, 422)
            }

            const { name, email, phoneNumber, subject, message, fileLink, companyName } = value

            const newContactUs = await databaseService.saveContactUs({
                name,
                email,
                phoneNumber,
                subject,
                message,
                fileLink,
                companyName
            })

            if(!newContactUs){
                return httpError(next, new Error(responseMessage.FAILED_TO_SAVE), req, 500)
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    queryContactUsData: async (req, res, next) => {
        try {
            const { limit = 10, offset = 0, subject, isRead, isSpam, isSolved } = req.query;
    
            const query = {};
            
            if (subject) {
                query.subject = subject;
            }
            if (isRead !== undefined) {
                query.isRead = isRead === 'true';
            }
            if (isSpam !== undefined) {
                query.isSpam = isSpam === 'true';
            }
            if (isSolved !== undefined) {
                query.isSolved = isSolved === 'true';
            }
            
            
            const contactUsList = await databaseService.queryContactUsData(query, limit, offset);
                 
            const total = await databaseService.countContactUsDocuments(query);
    
            const response = {
                total,
                limit: Number(limit),
                offset: Number(offset),
                contactUsList
            }
    
            httpResponse(req, res, 200, responseMessage.SUCCESS, response)
        } catch (err) {
            console.error('Error:', err);
            httpError(next, err, req, 500);
        }
    },
    updateContactUsData: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { body } = req;
    
            if(!id) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE('Document ID is missing')), req, 400);
            }

            const { value, error } = validateJoiSchema(ValidateUpdateContactUs, body)

            if (error) {
                return httpError(next, error, req, 422);
            }
    
            const updatedContactUs = await databaseService.updateContactUsById(id,value)
    
            if (!updatedContactUs) {
                return httpError(next, new Error(responseMessage.NOT_FOUND("Required Data")), req, 404);
            }
    
            httpResponse(req, res, 200, responseMessage.SUCCESS, updatedContactUs)
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    saveSupportEnquiry: async (req, res, next) => {
        try {
            const { body } = req

            const { value, error } = validateJoiSchema(ValidateSupportEnquiry, body)
            if (error) {
                return httpError(next, error, req, 422)
            }

            const { name, email, phoneNumber, subject, message, fileLink, companyName, productName, productSKUId } = value

            const newContactUs = await databaseService.saveSupportEnquiry({
                name,
                email,
                phoneNumber,
                subject,
                message,
                fileLink,
                companyName,
                productName,
                productSKUId
            })

            if(!newContactUs){
                return httpError(next, new Error(responseMessage.FAILED_TO_SAVE), req, 500)
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    querySupportEnquiryData: async (req, res, next) => {
        try {
            const { limit = 10, offset = 0, subject, isRead, isSpam, isSolved } = req.query;
    
            const query = {};
            
            if (isRead !== undefined) {
                query.isRead = isRead === 'true';
            }
            if (isSpam !== undefined) {
                query.isSpam = isSpam === 'true';
            }
            if (isSolved !== undefined) {
                query.isSolved = isSolved === 'true';
            }
            
            
            const contactUsList = await databaseService.querySupportEnquiry(query, limit, offset);
                 
            const total = await databaseService.countSupportEnquiryDocuments(query);
    
            const response = {
                total,
                limit: Number(limit),
                offset: Number(offset),
                contactUsList
            }
    
            httpResponse(req, res, 200, responseMessage.SUCCESS, response)
        } catch (err) {
            console.error('Error:', err);
            httpError(next, err, req, 500);
        }
    },
    updateSupportEnquiryData: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { body } = req;
    
            if(!id) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE('Document ID is missing')), req, 400);
            }

            const { value, error } = validateJoiSchema(ValidateUpdateSupportEnquiry, body)

            if (error) {
                return httpError(next, error, req, 422);
            }
    
            const updatedContactUs = await databaseService.updateSupportEnquiryById(id,value)
    
            if (!updatedContactUs) {
                return httpError(next, new Error(responseMessage.NOT_FOUND("Required Data")), req, 404);
            }
    
            httpResponse(req, res, 200, responseMessage.SUCCESS, updatedContactUs)
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    signIn: (req, res, next) => {
        try {
            const { body } = req;

            const { error, value } = validateJoiSchema(ValidateLogin, body)
            if (error) {
                return httpError(next, error, req, 422)
            }

            const { emailAddress, password } = value

            const user = allowedUsers.find(
                (user) => user.email === emailAddress && user.password === password
            );
            
            if (!user) {
                return httpError(next, new Error(responseMessage.INVALID_CREDENTIALS), req, 401);
            }

            const accessToken = quicker.generateToken(
                {
                    email: user.email
                },
                config.ACCESS_TOKEN.SECRET,
                config.ACCESS_TOKEN.EXPIRY
            )

            const DOMAIN = quicker.getDomainFromUrl(config.SERVER_URL)

            res.cookie('accessToken', accessToken, {
                path: '/api/v1',
                domain: DOMAIN,
                sameSite: 'strict',
                maxAge: 1000 * config.ACCESS_TOKEN.EXPIRY,
                httpOnly: true,
                secure: !(config.ENV === EApplicationEnvironment.DEVELOPMENT)
            })

            httpResponse(req, res, 200, responseMessage.SUCCESS,{accessToken})
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    selfIdentification: (req, res, next) => {
        try {
            const { authenticatedUser } = req
            httpResponse(req, res, 200, responseMessage.SUCCESS,authenticatedUser)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    saveSolutions: async(req, res, next) => {
        try {
            const { body } = req

            const {error, value} = validateJoiSchema(ValidateSoulution, body)

            if (error) {
                return httpError(next, error, req, 422)
            }

            const newSolution = await databaseService.saveSolutionData(value)

            if(!newSolution){
                return httpError(next, new Error(responseMessage.FAILED_TO_SAVE), req, 500)
            }
            httpResponse(req, res, 200, responseMessage.SUCCESS)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    querySolutions: async (req, res, next) => {
        try {
            const solutionsList = await databaseService.queryAllSolutions();

            if(!solutionsList){
                return httpError(next, new Error(responseMessage.NOT_FOUND("Data")), req, 404)
            }
            const response = []
            solutionsList.forEach(element => {
                response.push({
                    _id: element._id,
                    subcategories: element.subcategories,
                    thumbnail: element.thumbnail
                })
            });
            httpResponse(req, res, 200, responseMessage.SUCCESS, response)
        } catch (err) {
            console.error('Error:', err);
            httpError(next, err, req, 500);
        }
    },
    querySolution: async (req, res, next) => {
        try {
            const { id } = req.params;

            const solutionsList = await databaseService.querySolutionById(id);

            if(!solutionsList){
                return httpError(next, new Error(responseMessage.NOT_FOUND("Data")), req, 404)
            }
            httpResponse(req, res, 200, responseMessage.SUCCESS, solutionsList)
        } catch (err) {
            console.error('Error:', err);
            httpError(next, err, req, 500);
        }
    },
    updateSolutions : async (req, res, next) => {
        try {
            const { id } = req.params;
            const { body } = req;
    
            const { error, value } = validateJoiSchema(ValidateUpdateSolution, body)
    
            if (error) {
                return httpError(next, error, req, 422);
            }
    
            const updatedSolution = await databaseService.updateSolutionData(id, value);
    
            if (!updatedSolution) {
                return httpError(next, new Error(responseMessage.FAILED_TO_UPDATE), req, 500);
            }
    
            httpResponse(req, res, 200, responseMessage.SUCCESS);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    }
}

