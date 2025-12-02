import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Mail, Phone, User, Calendar, Image as ImageIcon, Loader2, Package, CheckCircle, Circle, ChevronLeft, ChevronRight, Search, Filter, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { signOut } from '@/lib/auth';
import { useAuth } from '@/hooks/useAuth';
import { supabase, type CustomJewelleryEnquiry, markEnquiryAsRead, markEnquiryAsUnread } from '@/lib/supabase';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [enquiries, setEnquiries] = useState<CustomJewelleryEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [filterStatus, setFilterStatus] = useState<'all' | 'read' | 'unread'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin-login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Fetch enquiries when filters change
  useEffect(() => {
    if (isAuthenticated) {
      fetchEnquiries();
    }
  }, [isAuthenticated, currentPage, pageSize, filterStatus, searchQuery]);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      
      // Build query with filters
      let query = supabase.from('custom_jewellery_enquiries').select('*', { count: 'exact' });
      
      // Apply read/unread filter
      if (filterStatus === 'read') {
        query = query.eq('is_read', true);
      } else if (filterStatus === 'unread') {
        query = query.eq('is_read', false);
      }
      
      // Apply search filter
      if (searchQuery.trim()) {
        query = query.or(
          `full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,phone.ilike.%${searchQuery}%`
        );
      }
      
      // Get total count with filters
      const { count } = await query;
      setTotalCount(count || 0);
      
      // Get paginated data
      const from = (currentPage - 1) * pageSize;
      const to = from + pageSize - 1;
      
      // Rebuild query for data fetch
      let dataQuery = supabase.from('custom_jewellery_enquiries').select('*');
      
      if (filterStatus === 'read') {
        dataQuery = dataQuery.eq('is_read', true);
      } else if (filterStatus === 'unread') {
        dataQuery = dataQuery.eq('is_read', false);
      }
      
      if (searchQuery.trim()) {
        dataQuery = dataQuery.or(
          `full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,phone.ilike.%${searchQuery}%`
        );
      }
      
      const { data, error } = await dataQuery
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) {
        throw error;
      }

      setEnquiries(data || []);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      toast({
        title: 'Error',
        description: 'Failed to load enquiries.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'Signed Out',
        description: 'You have been successfully signed out.',
      });
      navigate('/admin-login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: 'Error',
        description: 'Failed to sign out.',
        variant: 'destructive',
      });
    }
  };

  const handleToggleRead = async (enquiryId: string, currentStatus: boolean) => {
    try {
      if (currentStatus) {
        await markEnquiryAsUnread(enquiryId);
        toast({
          title: 'Marked as Unread',
          description: 'Enquiry marked as unread.',
        });
      } else {
        await markEnquiryAsRead(enquiryId);
        toast({
          title: 'Marked as Read',
          description: 'Enquiry marked as read.',
        });
      }
      
      // Refresh enquiries
      fetchEnquiries();
    } catch (error) {
      console.error('Error toggling read status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update enquiry status.',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const totalPages = Math.ceil(totalCount / pageSize);
  const unreadCount = enquiries.filter(e => !e.is_read).length;

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-rosegold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-champagne via-ivory to-mauve/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-champagne/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif text-leather">Admin Dashboard</h1>
              <p className="text-sm text-taupe">Welcome, {user?.email}</p>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="border-rosegold text-rosegold hover:bg-rosegold hover:text-ivory"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-champagne/50"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-rosegold to-mauve rounded-lg">
                <Package className="w-6 h-6 text-ivory" />
              </div>
              <div>
                <p className="text-sm text-taupe">Total Enquiries</p>
                <p className="text-2xl font-bold text-leather">{enquiries.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-champagne/50"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-rosegold to-mauve rounded-lg">
                <ImageIcon className="w-6 h-6 text-ivory" />
              </div>
              <div>
                <p className="text-sm text-taupe">With Images</p>
                <p className="text-2xl font-bold text-leather">
                  {enquiries.filter(e => e.reference_image_url).length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-champagne/50"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-rosegold to-mauve rounded-lg">
                <Circle className="w-6 h-6 text-ivory" />
              </div>
              <div>
                <p className="text-sm text-taupe">Unread</p>
                <p className="text-2xl font-bold text-leather">
                  {enquiries.filter(e => !e.is_read).length}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enquiries List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl border border-champagne/50 overflow-hidden"
        >
          <div className="p-6 border-b border-champagne/50 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif text-leather">Custom Jewellery Enquiries</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-taupe">Show:</span>
                  <Select
                    value={pageSize.toString()}
                    onValueChange={(value) => {
                      setPageSize(Number(value));
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <span className="text-sm text-taupe">
                  {totalCount} total enquiries
                </span>
              </div>
            </div>
            
            {/* Filters and Search */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* Search */}
              <div className="relative flex-1 min-w-[250px] max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-taupe" />
                <Input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 bg-champagne/30 border-taupe/30 focus:border-rosegold"
                />
              </div>
              
              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-taupe" />
                <Select
                  value={filterStatus}
                  onValueChange={(value: 'all' | 'read' | 'unread') => {
                    setFilterStatus(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Enquiries</SelectItem>
                    <SelectItem value="unread">Unread Only</SelectItem>
                    <SelectItem value="read">Read Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Clear Filters */}
              {(searchQuery || filterStatus !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setFilterStatus('all');
                    setCurrentPage(1);
                  }}
                  className="text-rosegold hover:text-rosegold/80"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="p-12 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-rosegold" />
            </div>
          ) : enquiries.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-12 h-12 text-taupe/50 mx-auto mb-4" />
              <p className="text-taupe">No enquiries yet</p>
            </div>
          ) : (
            <>
              <div className="divide-y divide-champagne/50">
              {enquiries.map((enquiry, index) => (
                <motion.div
                  key={enquiry.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-6 hover:bg-champagne/20 transition-colors ${
                    !enquiry.is_read ? 'bg-blue-50/30 border-l-4 border-l-rosegold' : ''
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Read/Unread Toggle - Moved to top of customer info */}
                    <div className="lg:col-span-4 flex justify-end -mt-2 -mr-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleRead(enquiry.id!, enquiry.is_read || false)}
                        className="flex items-center gap-2 hover:bg-champagne/50"
                      >
                        {enquiry.is_read ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-xs font-medium text-green-600">Mark as Unread</span>
                          </>
                        ) : (
                          <>
                            <Circle className="w-4 h-4 text-rosegold" />
                            <span className="text-xs font-medium text-rosegold">Mark as Read</span>
                          </>
                        )}
                      </Button>
                    </div>
                    {/* Customer Info */}
                    <div className="lg:col-span-2 space-y-3 -mt-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-rosegold" />
                        <span className="font-medium text-leather">{enquiry.full_name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-taupe">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${enquiry.email}`} className="hover:text-rosegold">
                          {enquiry.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-taupe">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${enquiry.phone}`} className="hover:text-rosegold">
                          {enquiry.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-taupe">
                        <Calendar className="w-4 h-4" />
                        {enquiry.created_at && formatDate(enquiry.created_at)}
                      </div>
                    </div>

                    {/* Design Details */}
                    <div className="lg:col-span-1">
                      <p className="text-sm font-medium text-leather mb-2">Design Details:</p>
                      <p className="text-sm text-taupe line-clamp-4">{enquiry.design_details}</p>
                    </div>

                    {/* Reference Image */}
                    <div className="lg:col-span-1">
                      {enquiry.reference_image_url ? (
                        <div>
                          <p className="text-sm font-medium text-leather mb-2">Reference Image:</p>
                          <div className="relative group">
                            <img
                              src={enquiry.reference_image_url}
                              alt="Reference"
                              className="w-full h-32 object-cover rounded-lg border border-champagne/50 transition-all"
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <Button
                                onClick={() => window.open(enquiry.reference_image_url!, '_blank')}
                                className="bg-white/90 hover:bg-white text-leather flex items-center gap-2"
                                size="sm"
                              >
                                <Eye className="w-4 h-4" />
                                View Image
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-32 bg-champagne/30 rounded-lg">
                          <ImageIcon className="w-8 h-8 text-taupe/50" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-6 border-t border-champagne/50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-taupe">
                    Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} enquiries
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="border-rosegold text-rosegold hover:bg-rosegold hover:text-ivory disabled:opacity-50"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setCurrentPage(pageNum)}
                            className={currentPage === pageNum 
                              ? 'bg-gradient-to-r from-rosegold to-mauve text-ivory' 
                              : 'border-rosegold text-rosegold hover:bg-rosegold hover:text-ivory'
                            }
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="border-rosegold text-rosegold hover:bg-rosegold hover:text-ivory disabled:opacity-50"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
