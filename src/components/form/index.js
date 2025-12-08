import { useState } from 'react';
import { User, Mail, Phone, MapPin, CreditCard, Check, AlertCircle } from 'lucide-react';
import './styles.css';

// Form validation helper
const validateForm = (data) => {
    const errors = {};
    
    if (!data.firstName?.trim()) errors.firstName = 'First name is required';
    if (!data.lastName?.trim()) errors.lastName = 'Last name is required';
    if (!data.email?.trim()) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Email is invalid';
    }
    if (!data.phone?.trim()) errors.phone = 'Phone is required';
    if (!data.street?.trim()) errors.street = 'Street is required';
    if (!data.city?.trim()) errors.city = 'City is required';
    if (!data.zipCode?.trim()) errors.zipCode = 'Zip code is required';
    if (!data.accountType) errors.accountType = 'Account type is required';
    
    // Conditional validation for business accounts array
    if (data.accountType === 'business' || data.accountType === 'enterprise') {
        if (!data.businessAccounts || data.businessAccounts.length === 0) {
        errors.businessAccounts = 'At least one business account is required';
        } else {
        const accountErrors = [];
        data.businessAccounts.forEach((account, index) => {
            const accErrors = {};
            if (!account.companyName?.trim()) accErrors.companyName = 'Company name is required';
            if (!account.taxId?.trim()) accErrors.taxId = 'Tax ID is required';
            if (!account.industry) accErrors.industry = 'Industry is required';
            
            if (data.accountType === 'enterprise') {
            if (!account.employeeCount) accErrors.employeeCount = 'Employee count is required';
            if (!account.annualRevenue) accErrors.annualRevenue = 'Annual revenue is required';
            }
            
            if (Object.keys(accErrors).length > 0) {
            accountErrors[index] = accErrors;
            }
        });
        
        if (accountErrors.length > 0) {
            errors.businessAccountErrors = accountErrors;
        }
        }
    }
    
    return errors;
};

// Personal Info Component
const PersonalInfo = ({ data, onChange, errors }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                        type="text"
                        value={data.firstName}
                        onChange={(e) => onChange('firstName', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="John"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                        type="text"
                        value={data.lastName}
                        onChange={(e) => onChange('lastName', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Doe"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
            </div>
            
            <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                </label>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => onChange('email', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="john.doe@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone
                </label>
                <input
                    type="tel"
                    value={data.phone}
                    onChange={(e) => onChange('phone', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="(555) 123-4567"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
        </div>
    );
};

// Address Component
const AddressInfo = ({ data, onChange, errors }) => {
    return (
        <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Address
        </h3>
        
        <div>
            <label className="block text-sm font-medium mb-1">Street Address</label>
            <input
            type="text"
            value={data.street}
            onChange={(e) => onChange('street', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg ${errors.street ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="123 Main St"
            />
            {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
                type="text"
                value={data.city}
                onChange={(e) => onChange('city', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="New York"
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            
            <div>
            <label className="block text-sm font-medium mb-1">Zip Code</label>
            <input
                type="text"
                value={data.zipCode}
                onChange={(e) => onChange('zipCode', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="10001"
            />
            {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
            </div>
        </div>
        </div>
    );
};

// Account Preferences Component
const AccountPreferences = ({ data, onChange, errors }) => {
    return (
        <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Account Preferences
        </h3>
        
        <div>
            <label className="block text-sm font-medium mb-2">Account Type</label>
            <div className="space-y-2">
            {['personal', 'business', 'enterprise'].map(type => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                    type="radio"
                    name="accountType"
                    value={type}
                    checked={data.accountType === type}
                    onChange={(e) => onChange('accountType', e.target.value)}
                    className="w-4 h-4"
                />
                <span className="capitalize">{type}</span>
                </label>
            ))}
            </div>
            {errors.accountType && <p className="text-red-500 text-xs mt-1">{errors.accountType}</p>}
        </div>
        
        <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                checked={data.newsletter}
                onChange={(e) => onChange('newsletter', e.target.checked)}
                className="w-4 h-4"
            />
            <span className="text-sm">Subscribe to newsletter</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                checked={data.terms}
                onChange={(e) => onChange('terms', e.target.checked)}
                className="w-4 h-4"
            />
            <span className="text-sm">I agree to terms and conditions</span>
            </label>
        </div>
        </div>
    );
};

// Business Account Card Component
const BusinessAccountCard = ({ account, index, accountType, onChange, onRemove, errors }) => {
    const cardErrors = errors?.[index] || {};
  
    return (
        <div className="space-y-4 bg-indigo-50 p-6 rounded-lg border-2 border-indigo-200 relative">
        <div className="flex justify-between items-start">
            <h4 className="text-md font-semibold text-indigo-900">
            Business Account {index + 1}
            </h4>
            <button
            onClick={() => onRemove(index)}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
            Remove
            </button>
        </div>
        
        <div>
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <input
            type="text"
            value={account.companyName || ''}
            onChange={(e) => onChange(index, 'companyName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg ${cardErrors.companyName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Acme Corporation"
            />
            {cardErrors.companyName && <p className="text-red-500 text-xs mt-1">{cardErrors.companyName}</p>}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium mb-1">Tax ID / EIN</label>
            <input
                type="text"
                value={account.taxId || ''}
                onChange={(e) => onChange(index, 'taxId', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg ${cardErrors.taxId ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="12-3456789"
            />
            {cardErrors.taxId && <p className="text-red-500 text-xs mt-1">{cardErrors.taxId}</p>}
            </div>
            
            <div>
            <label className="block text-sm font-medium mb-1">Industry</label>
            <select
                value={account.industry || ''}
                onChange={(e) => onChange(index, 'industry', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg ${cardErrors.industry ? 'border-red-500' : 'border-gray-300'}`}
            >
                <option value="">Select industry</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="other">Other</option>
            </select>
            {cardErrors.industry && <p className="text-red-500 text-xs mt-1">{cardErrors.industry}</p>}
            </div>
        </div>
        
        {accountType === 'enterprise' && (
            <div className="mt-4 p-4 bg-purple-50 rounded border border-purple-200">
            <h5 className="font-semibold text-sm mb-3 text-purple-900">Enterprise Features</h5>
            <div>
                <label className="block text-sm font-medium mb-1">Number of Employees</label>
                <input
                type="number"
                value={account.employeeCount || ''}
                onChange={(e) => onChange(index, 'employeeCount', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg ${cardErrors.employeeCount ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="100"
                min="1"
                />
                {cardErrors.employeeCount && <p className="text-red-500 text-xs mt-1">{cardErrors.employeeCount}</p>}
            </div>
            
            <div className="mt-3">
                <label className="block text-sm font-medium mb-1">Annual Revenue</label>
                <select
                value={account.annualRevenue || ''}
                onChange={(e) => onChange(index, 'annualRevenue', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg ${cardErrors.annualRevenue ? 'border-red-500' : 'border-gray-300'}`}
                >
                <option value="">Select range</option>
                <option value="0-1M">$0 - $1M</option>
                <option value="1M-10M">$1M - $10M</option>
                <option value="10M-100M">$10M - $100M</option>
                <option value="100M+">$100M+</option>
                </select>
                {cardErrors.annualRevenue && <p className="text-red-500 text-xs mt-1">{cardErrors.annualRevenue}</p>}
            </div>
            </div>
        )}
        </div>
    );
};

// Business Accounts Manager Component
const BusinessAccountsManager = ({ accountType, accounts, onChange, onAdd, onRemove, errors }) => {
    return (
        <div className="space-y-4">
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Business Accounts
            </h3>
            <button
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
            >
            <span className="text-lg">+</span>
            Add Account
            </button>
        </div>
        
        {accounts.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-600">No business accounts added yet.</p>
            <p className="text-sm text-gray-500 mt-1">Click "Add Account" to get started.</p>
            </div>
        ) : (
            <div className="space-y-4">
            {accounts.map((account, index) => (
                <BusinessAccountCard
                key={index}
                account={account}
                index={index}
                accountType={accountType}
                onChange={onChange}
                onRemove={onRemove}
                errors={errors}
                />
            ))}
            </div>
        )}
        </div>
    );
};

// Main App Component
const ComplexFormApp = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        zipCode: '',
        accountType: '',
        businessAccounts: [],
        newsletter: false,
        terms: false
    });
    
    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState(null);

    // Centralized change handler
    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        
        // Clear error for this field when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }));
        }
    };
    
    // Handle account type changes with cleanup
    const handleAccountTypeChange = (field, value) => {
        if (field === 'accountType' && value === 'personal') {
            // Clear business accounts array when switching to personal
            setFormData(prev => ({
                ...prev,
                accountType: value,
                businessAccounts: []
            }));

            setErrors(prev => {
                const { businessAccounts, businessAccountErrors, ...rest } = prev;
                return rest;
            });
        } else {
            handleChange(field, value);
        }
    };
    
    // Add a new business account
    const handleAddBusinessAccount = () => {
        setFormData(prev => ({
            ...prev,
            businessAccounts: [
                ...prev.businessAccounts,
                {
                    companyName: '',
                    taxId: '',
                    industry: '',
                    ...(prev.accountType === 'enterprise' ? {
                        employeeCount: '',
                        annualRevenue: ''
                    } : {})
                }
            ]
        }));
    };
    
    // Update a specific business account
    const handleBusinessAccountChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            businessAccounts: prev.businessAccounts.map((account, i) => 
                i === index ? { ...account, [field]: value } : account
            )
        }));
        
        // Clear error for this specific field in this account
        if (errors.businessAccountErrors?.[index]?.[field]) {
        setErrors(prev => ({
            ...prev,
            businessAccountErrors: prev.businessAccountErrors.map((accErr, i) => 
            i === index ? { ...accErr, [field]: undefined } : accErr
            )
        }));
        }
    };
    
    // Remove a business account
    const handleRemoveBusinessAccount = (index) => {
        setFormData(prev => ({
            ...prev,
            businessAccounts: prev.businessAccounts.filter((_, i) => i !== index)
        }));
        
        // Clear errors for this account
        if (errors.businessAccountErrors?.[index]) {
        setErrors(prev => ({
            ...prev,
            businessAccountErrors: prev.businessAccountErrors.filter((_, i) => i !== index)
        }));
        }
    };

    // Submit handler with validation
    const handleSubmit = (e) => {
        e?.preventDefault();
        setSubmitStatus(null);
        
        // Validate form
        const validationErrors = validateForm(formData);
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSubmitStatus('error');
            return;
        }
        
        // Prepare data for database
        const preparedData = {
            ...formData,
            // Add metadata
            submittedAt: new Date().toISOString(),
            // Normalize data
            email: formData.email.toLowerCase().trim(),
            phone: formData.phone.replace(/\D/g, ''), // Remove non-digits
            // Remove empty fields
            ...(Object.fromEntries(
                Object.entries(formData).filter(([_, v]) => v !== '')
            ))
        };
        
        console.log('Data ready for database:', preparedData);
        
        // Simulate API call
        setTimeout(() => {
        setSubmitStatus('success');
        }, 1000);
    };

    const handleReset = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            street: '',
            city: '',
            zipCode: '',
            accountType: '',
            businessAccounts: [],
            newsletter: false,
            terms: false
        });
        setErrors({});
        setSubmitStatus(null);
    };

    return (
        <div className='css-form-reset'>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Account Registration</h1>
                    <p className="text-gray-600 mb-8">Complete the form below to create your account</p>
                    
                    <div className="space-y-8">
                    <PersonalInfo 
                        data={formData} 
                        onChange={handleChange}
                        errors={errors}
                    />
                    
                    <div className="border-t pt-8">
                        <AddressInfo 
                            data={formData} 
                            onChange={handleChange}
                            errors={errors}
                        />
                    </div>
                    
                    <div className="border-t pt-8">
                        <AccountPreferences 
                            data={formData} 
                            onChange={handleAccountTypeChange}
                            errors={errors}
                        />
                    </div>
                    
                    {/* Conditionally render business accounts manager */}
                    {(formData.accountType === 'business' || formData.accountType === 'enterprise') && (
                        <div className="border-t pt-8">
                        <BusinessAccountsManager
                            accountType={formData.accountType}
                            accounts={formData.businessAccounts}
                            onChange={handleBusinessAccountChange}
                            onAdd={handleAddBusinessAccount}
                            onRemove={handleRemoveBusinessAccount}
                            errors={errors.businessAccountErrors}
                        />
                        {errors.businessAccounts && (
                            <p className="text-red-500 text-sm mt-2">{errors.businessAccounts}</p>
                        )}
                        </div>
                    )}
                    
                    {submitStatus === 'error' && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium text-red-800">Please fix the errors above</p>
                            <p className="text-sm text-red-600">All required fields must be filled correctly</p>
                        </div>
                        </div>
                    )}
                    
                    {submitStatus === 'success' && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium text-green-800">Success!</p>
                            <p className="text-sm text-green-600">Your form has been submitted. Check console for prepared data.</p>
                        </div>
                        </div>
                    )}
                    
                    <div className="flex gap-4">
                        <button
                        onClick={handleSubmit}
                        className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                        >
                        Submit Application
                        </button>
                        <button
                        onClick={handleReset}
                        className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                        Reset
                        </button>
                    </div>
                    </div>
                    
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2 text-sm text-gray-700">Current Form State:</h3>
                        <div className="text-xs bg-gray-800 text-green-400 p-3 rounded overflow-auto max-h-48">
                            <pre>{JSON.stringify(formData, null, 2)}</pre>
                            {formData.businessAccounts.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-600">
                                <p className="text-yellow-400 mb-1">Business Accounts Array ({formData.businessAccounts.length}):</p>
                                <pre>{JSON.stringify(formData.businessAccounts, null, 2)}</pre>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComplexFormApp;